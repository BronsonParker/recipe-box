// Defining variables to POST the pre-made recipes.
const input = document.getElementById("recipe-id");
const getBtn = document.getElementById("get-btn");
const getStatus = document.getElementById("status");
const recipeArea = document.getElementById("recipe");

// Defining variables to POST for the added recipes.
const dishInput = document.getElementById("dish-name");
const postButton = document.getElementById("post-btn");
const postStatus = document.getElementById("post-status");
const savedArea = document.getElementById("saved");


// Function to GET the Recipes and POST them on the screen.
async function getRecipe() {
    const url = `https://dummyjson.com/recipes/${input.value}`
    // To ensure old recipes are cleared out when new ones are entered.
    recipeArea.textContent="";

    const response = await fetch(url);
    const recipe = await response.json();
    console.log(recipe);

    const card = document.createElement("div");
    card.className = "card p-3 mb-5 w-65";

    const title = document.createElement("h3");
    title.textContent = recipe.name;
    card.appendChild(title);

    const cuisine = document.createElement("p");
    cuisine.textContent = "Cuisine: " + recipe.cuisine;
    card.appendChild(cuisine);

    const time = document.createElement("p");
    time.textContent = "Cook Time: " + recipe.prepTimeMinutes + " Minutes";
    card.appendChild(time);

    recipeArea.appendChild(card);

    // Clears the input box.
    input.value = "";
};

getBtn.addEventListener("click", getRecipe);

async function addDish() {
  savedArea.textContent = "";

  const response = await fetch("https://dummyjson.com/recipes/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: dishInput.value })
  });
  const newDish = await response.json();
  console.log(newDish);

  const message = document.createElement("p");
  message.className = "alert alert-success";
  message.textContent = 'Successfully Added "' + newDish.name + '" as recipe #' + newDish.id + " (Just Kidding! This is only practice.)";
  savedArea.appendChild(message);

  // Clears input area.
  dishInput.value = "";   
}

postButton.addEventListener("click", addDish)
