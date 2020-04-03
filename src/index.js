let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const foundForm = document.querySelector(".add-toy-form")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }

  });





fetch("http://localhost:3000/toys")
.then (response => response.json())
.then (data => {
  data.forEach(toy => {
      renderMessage(toy)
  })
})

function renderMessage(toy){
  // console.log(toy)
  let cardSpace = document.querySelector("#toy-collection")
  // created elements
  let cardDiv = document.createElement("div")
  let cardH2 = document.createElement("h2")
let cardImage = document.createElement("img")
let cardP = document.createElement("p")
let cardButton = document.createElement("button")
// add info to elements
cardP.className = "likedClass"
cardH2.innerText = toy.name
cardImage.src = toy.image
cardImage.height = 150
cardButton.innerText = "Like"
cardP.innerText = toy.likes

cardButton.id = toy.id

cardSpace.appendChild(cardDiv)

cardDiv.appendChild(cardH2)
cardDiv.appendChild(cardImage)
cardDiv.appendChild(cardP)
cardDiv.appendChild(cardButton)
cardButton.addEventListener("click",function(e){
  let foundCount = e.target.parentElement.querySelector(".likedClass").innerText

  foundCount = parseInt(foundCount) + 1
  let foundToy = e.target.id
  fetch(`http://localhost:3000/toys/${foundToy}`, {
  method: 'PATCH', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    likes: foundCount
    
  }),
})
.then((response) => response.json())
.then((data) => {

    // renderMessage(data)
   e.target.parentElement.querySelector(".likedClass").innerText =
   foundCount
})
.catch((error) => {
  console.error('Error:', error);
});
  
})

}


  
  





foundForm.addEventListener("submit", function(e){
e.preventDefault()
  let name = e.target.name.value
let image = e.target.image.value
  fetch('http://localhost:3000/toys', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    image: image,
    name: name,
    likes: 0
  }),
})
.then((response) => response.json())
.then((data) => {
  renderMessage(data);
})
.catch((error) => {
  console.error('Error:', error);
});
})


});










