// Defining variables to report the pre-made recipes.
const input = document.getElementById("recipe-id");
const getBtn = document.getElementById("get-btn");
const getStatus = document.getElementById("status");
const recipeArea = document.getElementById("recipe");


// Function to GET the Recipes and display them on the screen.
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
        getStatus.textContent = "No recipe with that number. Our Digital Chefs only know 50 recipes right now. Try a number from 1-50.";
        return;
    }
    
    // Loads the response by makes sure the script pauses before loading is finished
    const recipe = await response.json();
    console.log(recipe);

    // Creates the elements that show the recipe cards.
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

    // Shows that the server can't be contacted.
    } catch (error) {
    statusText.textContent = "Can't reach the Digital Chefs. Check your internet and send your ticket again."; 
    }
};

getBtn.addEventListener("click", getRecipe);



// Defining variables to POST for the added recipes.
const dishInput = document.getElementById("dish-name");
const postButton = document.getElementById("post-btn");
const postStatus = document.getElementById("post-status");
const savedArea = document.getElementById("saved");

async function addDish() {

    // Prompts if your entry to POST a dish is empty
    if (dishInput.value === "") {
        postStatus.textContent = "Type a dish name first.";
        return;
    }

    // Clears POST response field
    savedArea.textContent = "";

    // Gives a prompt showing that the script is trying to send information to the server
    try {
        postStatus.textContent = "Teaching Our Chefs...";
        const response = await fetch("https://dummyjson.com/recipes/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: dishInput.value })
    });

    // Returns a prompt if recipe couldn't POST properly. FYI 'in the weeds' means a cook is really behind or not responding
    if (!response.ok) {
        postStatus.textContent = "Our Digital Chefs seem to be in the weeds. Please try again.";
        return;
    }

    const newDish = await response.json();
    console.log(newDish);

    // Makes the element to show the POST of the new recipe card
    const message = document.createElement("p");
    message.className = "alert alert-success";
    message.textContent = 'Successfully Added "' + newDish.name + '" as recipe #' + newDish.id + " (Just Kidding! This is only practice.)";
    savedArea.appendChild(message);

    // Clears input and status area.
    postStatus.textContent = "";
    dishInput.value = "";
    
    // Again, this is for when the server can't be reached.
    } catch (error) {
    postStatus.textContent = "Can't reach the Digital Chefs. Check your internet and send your ticket again.";
    };
};

postButton.addEventListener("click", addDish);
