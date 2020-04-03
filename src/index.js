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
    const allToys = document.querySelector('#toy-collection')
    fetch('http://localhost:3000/toys')
        .then(response => response.json())
        .then(toyList => {
            toyList.forEach(toy => {
                //create card <div class = "card">
                const card = document.createElement('div')
                card.className = "card"
                card.id = toy.id
                    //create all elements for child
                    //h2 for name
                const head = document.createElement('h2')
                head.innerText = toy.name
                    //img, class name toy-avatar, src url
                const toyImg = document.createElement('img')
                toyImg.src = toy.image
                toyImg.style.height = '250px'
                toyImg.style.width = '250px'
                    //p, how many likes
                const like = document.createElement('p')
                like.innerText = `${toy.likes} Likes`
                    //button class like-btn
                const likeButton = document.createElement('button')
                likeButton.innerText = " Like "
                likeButton.className = "like-btn"
                likeButton.addEventListener("click", function(e) {
                        let likeCount = parseInt(e.target.parentNode.querySelector("p").innerText.split(" ")[0]) + 1
                        let toyId = e.target.parentElement.id
                        fetch(`http://localhost:3000/toys/${toyId}`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ likes: likeCount })
                            })
                            .then(response => response.json())
                            .then(actualNewToy => {
                                document.getElementById(actualNewToy.id).querySelector("p").innerText = `${actualNewToy.likes} Likes`
                            })


                    })
                    //append elements to card
                card.append(head, toyImg, like, likeButton)
                    //append card to container
                allToys.appendChild(card)
            })
        })

    const newToyForm = document.querySelector(".add-toy-form")
    newToyForm.addEventListener("submit", function(e) {

        const newToy = {
            name: e.target.name.value,
            image: e.target.image.value,
            likes: 0
        }

        fetch('http://localhost:3000/toys', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newToy)
            })
            .then(response => response.json())
            .then(actualNewToy => {
                console.log(actualNewToy)
            })

    })

});