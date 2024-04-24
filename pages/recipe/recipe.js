// Get references to the elements
const smallTitleElement = document.getElementById("smallTitle");
const bigTitleElement = document.getElementById("bigTitle");
const paragraphElement = document.getElementById("paragraph");
const recipeImageElement = document.getElementById("recipeImage");
const ingredientsListElement = document.getElementById("ingredientsList");

// Define the recipe data
const recipeData = {
  smallTitle: "New Small Title",
  bigTitle: "New Big Title",
  paragraph: "New One line paragraph",
  imageURL: "https://via.placeholder.com/400x300",
  ingredients: ["New Ingredient 1", "New Ingredient 2", "New Ingredient 3"],
};

// Function to update the content
function updateContent(data) {
  smallTitleElement.textContent = data.smallTitle;
  bigTitleElement.textContent = data.bigTitle;
  paragraphElement.textContent = data.paragraph;
  recipeImageElement.src = data.imageURL;

  // Clear existing ingredients
  ingredientsListElement.innerHTML = "";

  // Add new ingredients
  data.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    ingredientsListElement.appendChild(li);
  });
}

// Call the function with the initial data
updateContent(recipeData);

//!Btns
// Function to handle button clicks and display alerts
function handleClick(btnNumber) {
  alert("Hi, I am btn " + btnNumber);
}

// Get references to the buttons
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

// Add event listeners to the buttons
btn1.addEventListener("click", function () {
  handleClick(1);
});

btn2.addEventListener("click", function () {
  handleClick(2);
});

btn3.addEventListener("click", function () {
  handleClick(3);
});
//! DATA and API

// Get the current URL
const url = window.location.href;

// Extract the recipe ID from the URL
const recipeId = url.split("/").pop(); // Get the last segment of the URL
console.log(recipeId);
// Fetch data based on recipe ID
// variables
const requestUrl = `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=bf8d8944&app_key=88000ac38f8ecc420d6524fbf50c91cd`;

// Make a GET request to the Edamam API
fetch(requestUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Handle the response data
    console.log(data.label);
    // console.log(data.hits[0].recipe);
    // console.log(data.hits[0].recipe);
    console.log(data.mealType);
    console.log(data.ingredientLines); //Array
    console.log(data.dietLables);
    console.log(data.image);
    console.log(data.totalTime);
    // Extract and use recipe data as needed
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
