let recipeUrlEx = "";
let recipeIdEx = "";

// Retrieve the favRecipes from local storage
let favRecipes = JSON.parse(localStorage.getItem("favRecipes")) || [];
let recipesHit = []; //Array includes recipes data

// Now favRecipes is an array containing the stored recipe IDs
console.log(favRecipes); //Array includes Fav Recipes IDs

const apiKey = "88000ac38f8ecc420d6524fbf50c91cd";
getDataFromAPIThenDisplay(favRecipes); //When page loaded, seearch for main to display some main or common recipes

//Check if user logged in or not, if not, redrict him to log-in page
const medicalDataJSON = localStorage.getItem("medical-data");
const medicalData = JSON.parse(medicalDataJSON);
if (!medicalData) {
  window.location.href = "./pages/log-in/log-in.html";
}

// Header
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
  setTimeout(() => {
    sidebar.style.transform = "translateX(0)";
  }, 10);
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.transform = "translateX(100%)";
  setTimeout(() => {
    sidebar.style.display = "none";
  }, 300);
}

//Generate recipe box
// Function to generate product cards
const container = document.getElementById("product-container");
function generateProductCards(products) {
  container.innerText = ""; //To delete the old results before Displying new results
  let i = 0;
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add(i++); //To set index for each recipe
    productCard.classList.add("product-card");
    const productImgContainer = document.createElement("div");
    productImgContainer.classList.add("product-img-container");
    const productImg = document.createElement("div");
    productImg.classList.add("product-img");
    productImg.style.backgroundImage = `url(${product.recipe.image})`;
    productImgContainer.appendChild(productImg);
    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");
    const productTitle = document.createElement("h2");
    productTitle.classList.add("product-title");
    productTitle.textContent = product.recipe.label;
    const productDescription = document.createElement("p");
    productDescription.classList.add("product-description");
    productDescription.textContent = product.recipe.dishType[0];
    productInfo.appendChild(productDescription);
    productInfo.appendChild(productTitle);
    productCard.appendChild(productImgContainer);
    productCard.appendChild(productInfo);
    container.appendChild(productCard);

    productCard.addEventListener("click", () => {
      recipeUrlEx = recipesHit[productCard.classList[0]].recipe.url;
      recipeIdEx = extractRecipeId(
        recipesHit[productCard.classList[0]]._links.self.href
      );
      console.log(productCard.classList[0]); //It prints the index of the certain recipe
      openRecipePopUpWithData(
        recipesHit[productCard.classList[0]].recipe.dishType,
        recipesHit[productCard.classList[0]].recipe.label,
        recipesHit[productCard.classList[0]].recipe.totalTime,
        recipesHit[productCard.classList[0]].recipe.image,
        recipesHit[productCard.classList[0]].recipe.ingredientLines,
        recipesHit[productCard.classList[0]].recipe.url,
        extractRecipeId(recipesHit[productCard.classList[0]]._links.self.href) //This pass recipe ID
      );
    });
  });
}

// ! ! ! ! ! ! ! ! ! ! ! ! ! ! !   A.   P.   I.    ! ! ! ! ! ! ! ! ! ! ! ! ! ! !

// !RECIPE POPUP
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

function openRecipePopUpWithData(
  smallTitle,
  bigTitle,
  oneLineParagraph,
  imgSrc,
  ingredients,
  recipeUrl,
  recipeId
) {
  const recipePopup = document.querySelector(".recipe-pop-up");
  //This stupid block of code for: عشان يبقى شكلها حلو وهي بتفتح
  const intervalDuration = 1; // mili seconds
  const targetWidth = 95; // percent
  const targetHeight = 95; //  percent
  const stepWidth = targetWidth / ((0.01 * 1000) / intervalDuration);
  const stepHeight = targetHeight / ((0.01 * 1000) / intervalDuration);

  let currentWidth = 0;
  let currentHeight = 0;

  recipePopup.style.width = "0%";
  recipePopup.style.height = "0%";
  recipePopup.style.display = "block";

  const interval = setInterval(function () {
    currentWidth += stepWidth;
    currentHeight += stepHeight;

    recipePopup.style.width = currentWidth + "%";
    recipePopup.style.height = currentHeight + "%";

    if (currentWidth >= targetWidth || currentHeight >= targetHeight) {
      clearInterval(interval);
    }
  }, intervalDuration);

  //If the recipe in favorite, make the btn1 greeen.
  let favRecipes = JSON.parse(localStorage.getItem("favRecipes")) || [];
  const index = favRecipes.indexOf(recipeIdEx);
  if (index !== -1) {
    document.getElementById("btn1").classList.add("in-fav");
  } else {
    document.getElementById("btn1").classList.remove("in-fav");
  }

  document.body.style.overflow = "hidden"; // Prevetn scrolling of the main page

  // Update content
  updateContent({
    smallTitle: smallTitle,
    bigTitle: bigTitle,
    paragraph: oneLineParagraph,
    imageURL: imgSrc,
    ingredients: ingredients,
  });
}

function closeRecipePopUp() {
  document.querySelector(".recipe-pop-up").style.display = "none";
  document.body.style.overflow = "auto"; // Allow scrolling of the main page
}

//Extract ID
function extractRecipeId(url) {
  const pattern = /\/([\w\d]+)\?/;
  const match = url.match(pattern);
  if (match && match.length >= 2) {
    return match[1];
  } else {
    return null;
  }
}

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

btn1.addEventListener("click", function () {
  console.log("Certain RecipeIdEx: " + recipeIdEx);
  // Retrieve the current favRecipes from local storage
  let favRecipes = JSON.parse(localStorage.getItem("favRecipes")) || [];

  // Check if recipeIdEx is already in favRecipes
  const index = favRecipes.indexOf(recipeIdEx);

  if (index !== -1) {
    // RecipeIdEx is already in favRecipes, so remove it
    favRecipes.splice(index, 1);
    btn1.classList.remove("in-fav");
  } else {
    // RecipeIdEx is not in favRecipes, so add it
    favRecipes.push(recipeIdEx);
    btn1.classList.add("in-fav");
  }

  // Save the updated favRecipes back to local storage
  localStorage.setItem("favRecipes", JSON.stringify(favRecipes));
});

btn2.addEventListener("click", () => {
  window.open(recipeUrlEx, "_blank");
});

btn3.addEventListener("click", function () {
  closeRecipePopUp();
});

function getDataFromAPIThenDisplay(query) {
  // const requestUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=bf8d8944&app_key=${apiKey}`;
  query.forEach((favRecipeId) => {
    const requestUrl = `https://api.edamam.com/api/recipes/v2/${favRecipeId}?type=public&app_id=bf8d8944&app_key=88000ac38f8ecc420d6524fbf50c91cd`;
    // Make a GET request to the Edamam API
    fetch(requestUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("===============");
        console.log(recipesHit);
        console.log(data);
        recipesHit.push(data);
        console.log(recipesHit);
        console.log("===============");
        // Handle the response data
        // console.log(data);
        // console.log(data.hits[0]);
        // console.log(data.hits[0].recipe);
        // console.log(data.hits[0].recipe);
        // console.log(data.hits[0].recipe.mealType);
        // console.log(data.hits[0].recipe.ingredientLines); //Array
        // console.log(data.hits[0].recipe.dietLables);
        // console.log(data.hits[0].recipe.image);
        // console.log(data.hits[0].recipe.url);

        // Extract and use recipe data as needed
        generateProductCards(recipesHit); //To Fill recipe box with API data
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });
}
generateProductCards(recipesHit);
