let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// global variables

const toyCollection = document.querySelector("#toy-collection");
const newToyForm = document.querySelector(".add-toy-form");

// Access list of toys from API using fetch

fetch("http://localhost:3000/toys")
  .then((r) => r.json())
  .then((toyCards) =>
    toyCards.forEach((toyCard) => {
      renderToyCard(toyCard);
    })
  );

// render toy cars

function renderToyCard(toyCard) {
  // adds class name to the div element
  // toyCollection.className = "card";

  const div = document.createElement("div");

  div.className = "card";

  div.innerHTML = `
      <h2>${toyCard.name}</h2>
      <img src=${toyCard.image} class="toy-avatar" />
      <p>${toyCard.likes} Likes</p>
      <button class="like-btn" id="${toyCard.id}">
        Like ❤️
      </button>
  
  `;

  toyCollection.append(div);
}

// render new toy
newToyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const toyObject = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0,
  };

  newToyForm.reset();

  renderToyCard(toyObject);

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify(toyObject),
  });
});
