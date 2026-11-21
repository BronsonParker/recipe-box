const input = document.getElementById("recipe-id");
const getBtn = document.getElementById("get-btn");
const getStatus = document.getElementById("status");
const recipeArea = document.getElementById("recipe");

async function.getRecipe() {
    recipeArea.textContent=""

    const response = await fetch(`https://dummyjson.com/recipes/${input.value}`);
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
    time.textContent = "Cook Time: " + recipe.prepTimeMinutes + " Minutes"
    card.appendChild(time);

    const img = 
}

getBtn.addEventListener("click", getRecipe);

