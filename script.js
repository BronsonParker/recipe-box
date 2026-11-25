// Defining variables to POST the pre-made recipes.
const input = document.getElementById("recipe-id");
const getBtn = document.getElementById("get-btn");
const getStatus = document.getElementById("status");
const recipeArea = document.getElementById("recipe");


// Function to GET the Recipes and POST them on the screen.
async function getRecipe() {

    // Prevents Blank entry.
    if (input.value === "") {
        getStatus.textContent = "Type a number first.";
        return;
    }

    // To ensure old recipes are cleared out when new ones are entered.
    recipeArea.textContent="";

    // Loads a searching text to show that it is attempting to contact the server
    try {
        const url = `https://dummyjson.com/recipes/${input.value}`
        getStatus.textContent = "Searching for Recipes...";
        const response = await fetch(url);
    
    // Returns text explaining that this is an invalid number
    if (!response.ok) {
        getStatus.textContent = "No recipe with that number. Try 1 to 50.";
        return;
    }
    
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

    // Clears input and loading text when it loads the card.
    getStatus.textContent = "";
    input.value = "";
    } catch (error) {
    statusText.textContent = "Can't reach the recipe server. Check your internet."; 
    }
};

getBtn.addEventListener("click", getRecipe);



// Defining variables to POST for the added recipes.
const dishInput = document.getElementById("dish-name");
const postButton = document.getElementById("post-btn");
const postStatus = document.getElementById("post-status");
const savedArea = document.getElementById("saved");

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
