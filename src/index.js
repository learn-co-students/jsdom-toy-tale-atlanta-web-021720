
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
 
  });


  toyForm.addEventListener("submit", (event) =>{  
    //debugger
    // event.target.default
    // e.preventDefault()
    post_new_toy(event)
  });
  


  const toy_collections_div = document.querySelector("#toy-collection")

  let addToy = false;

  function get_toy_collections()
  {
    fetch('http://localhost:3000/toys')
    .then(res=>res.json())
    .then(data=>
      {
        console.log(data)
        //toy_collections.innerHTML = data
        parce_toy_data(data)
      }  
    )
  }

  function parce_toy_data(data)
  {
    data.forEach(toy => {
      parce_toy(toy)
    });
  } 

  function parce_toy(toy)
  {
    const h2_tag = document.createElement('h2');
    h2_tag.innerHTML = toy.name

    const img_tag = document.createElement('img');
    img_tag.src = toy.image
    img_tag.height = 100
    img_tag.widht = 100

    const p_tag = document.createElement('p');
    p_tag.innerText = toy.likes
    p_tag.className = "likedClass"

    const like_button = document.createElement('button')
    like_button.name = 'Likes'
    like_button.id = toy.id


    const card_div = document.createElement('div')

    card_div.appendChild(h2_tag)
    card_div.appendChild(img_tag)
    card_div.appendChild(p_tag)
    card_div.appendChild(like_button)


    toy_collections_div.appendChild(card_div)

    like_button.addEventListener('click', (event)=>{
      //console.log(event.target)
      add_likes(event);
    });
  }  

  function post_new_toy(event)
  {
    name = event.target.name.value
    image = event.target.image.value
    
    let formData = {
      name: name,
      image: image,
      likes: 0
    };
     
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
     
    fetch("http://localhost:3000/toys", configObj);
  }

  function add_likes(event)
  {
    const like_count = parseInt(event.target.parentElement.querySelector('.likedClass').innerText) +1
    let formData = {
      likes: like_count
    };
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    // debugger  
    fetch(`http://localhost:3000/toys/${event.target.id}`, configObj);

    event.target.parentElement.querySelector('.likedClass').innerText = like_count
  }

  get_toy_collections();

});
