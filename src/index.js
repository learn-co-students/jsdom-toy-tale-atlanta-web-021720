let addToy = false;

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
//------------------fetch toys and render cards on screen--------------

  fetch('http://localhost:3000/toys')
  .then( response => response.json())
    .then(toyList => {
      toyList.forEach(toyData => {
        renderToy(toyData)
    })
  })
//----------------create new toy----------------------------------------
  //create form event listener
  toyForm.addEventListener('submit', (e) => {
    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(response => response.json())
    .then(toyData => {
        renderToy(toyData)
    })
  })
  //----------------------------like button-------------------------
  const allToys = document.querySelector('#toy-collection')

  //add event listener to buttons by delegation
  allToys.addEventListener('click', (e) => {
    const parentElement = e.target.closest('div')
    const siblingLikeElement = parentElement.querySelector('p')
    const newLikeCount = ((original) => {
      let num = parseInt(original.innerText)
      return ++num
    })(siblingLikeElement)
    if (e.target.className === 'like-btn') {
      fetch(`http://localhost:3000/toys/${parentElement.dataset.id}`, {
        method: 'PATCH',
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body:JSON.stringify({
          "likes": `${newLikeCount}`
        })
      })
      .then(response => response.json())
      .then(toyData => {
          siblingLikeElement.innerText = `${toyData.likes} Likes`
      })
    }
  })

  function renderToy(toyData) {
    const card = document.createElement('div')
    card.className = "card"
    card.dataset.id = toyData.id
  
    const head = document.createElement('h2')
    head.innerText = toyData.name
  
    const toyImg = document.createElement('img')
    toyImg.src = toyData.image
    toyImg.style.height = '250px'
    toyImg.style.width = '250px'
  
    const like = document.createElement('p')
    like.innerText = `${toyData.likes} Likes`
  
    const likeButton = document.createElement('button')
    likeButton.innerText = " Like "
    likeButton.className = "like-btn"
  
    card.append(head, toyImg, like, likeButton)
    allToys.appendChild(card)
  }

}); //end DOMContentLoaded listener

