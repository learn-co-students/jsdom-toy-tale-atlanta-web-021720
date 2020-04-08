let addToy = false;
let toyContainer = document.querySelector("#toy-collection");
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  fetchToys();
  fetchNewToys();
  //fetchNewLike();

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toyData => {
    toyContainer.innerHTML = ""
    toyData.forEach(toy => {
      newToyCard(toy);
    })
    })
}

function newToyCard(toy) {
  let cardContainer = document.createElement("div");
  cardContainer.className = "card"

  let toyNameH2 = document.createElement("h2");
  toyNameH2.innerHTML = toy.name;

  let toyImg = document.createElement("img");
  toyImg.src = toy.image
  toyImg.className = "toy-avatar"

  let toyP = document.createElement("p");
  toyP.innerHTML = toy.likes

  let toyBtn = document.createElement("button");
  toyBtn.innerHTML = "Like"
  toyBtn.className = "like-btn"

  cardContainer.appendChild(toyNameH2);
  cardContainer.appendChild(toyImg)
  cardContainer.appendChild(toyP)
  cardContainer.appendChild(toyBtn)
  toyContainer.appendChild(cardContainer)

  toyBtn.addEventListener("click", e => {

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes++
      })
    })
    .then(response => response.json())
    .then(updatedToy => {
      fetchToys()
    })
  })
}

function fetchNewToys() {
  let toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener("submit", e => {
    e.preventDefault();
    const toyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }

    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyObj),
    })
    .then((response) => response.json())
    .then((newToyData) => {
      newToyCard(newToyData);
    })
    e.target.reset();
    })
}

// function fetchNewLike() {
//   let toyCard = document.querySelector(".card")

//   toyCard.addEventListener("click", e => {
//     console.log("working")
//   })
// }