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

//!!!!!!!! Btns
// Function to handle button clicks and display alerts
function handleClick(btnNumber) {
  alert("Hi, I am btn " + btnNumber);
}

// Get references to the buttons
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

// Add event listeners to the buttons
btn1.addEventListener("click", function() {
  handleClick(1);
});

btn2.addEventListener("click", function() {
  handleClick(2);
});

btn3.addEventListener("click", function() {
  handleClick(3);
});
