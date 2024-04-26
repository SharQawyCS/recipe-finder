// Retrieve user data from local storage
const userData = JSON.parse(localStorage.getItem("userData"));
if (userData && userData.username) {
  document.getElementById("greeting").textContent = `Hi, ${userData.username}`;
} else {
  console.log("No user data found.");
}

// Determine health state function
function determineHealthState() {
  // Retrieve medical data from local storage
  const medicalData = JSON.parse(localStorage.getItem("medical-data"));

  if (!medicalData) {
    return null;
  }

  // Extract height, current weight, and recommended weight from medical data
  const { height, weight } = medicalData;

  // Calculate BMI
  const bmi = calculateBMI(height, weight);

  // Determine health state based on BMI
  let healthState;
  if (bmi < 18.5) {
    healthState = "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    healthState = "Normal weight";
  } else if (bmi >= 25 && bmi < 30) {
    healthState = "Overweight";
  } else {
    healthState = "Obese";
  }

  // Calculate recommended weight based on current height and normal BMI range (18.5 - 24.9)
  const normalWeightLowerLimit = 18.5 * (height / 100) ** 2;
  const recommendedWeight = 24.9 * (height / 100) ** 2;

  // Calculate weight needed to gain or lose for a normal BMI (18.5 - 24.9)
  const weightToGain =
    healthState === "Underweight"
      ? (normalWeightLowerLimit - weight).toFixed(2)
      : null;
  const weightToLose =
    healthState === "Overweight" || healthState === "Obese"
      ? (weight - recommendedWeight).toFixed(2)
      : null;

  // Food recommendations
  let foodRecommendations;
  if (healthState === "Underweight") {
    foodRecommendations = "Recommendations for gaining weight";
  } else if (healthState === "Overweight" || healthState === "Obese") {
    foodRecommendations = "Recommendations for losing weight";
  } else {
    foodRecommendations = "No specific recommendations";
  }

  return {
    healthState: healthState,
    currentWeight: weight.toFixed(2), // Rounded to 2 decimal places
    recommendedWeight: recommendedWeight.toFixed(2), // Rounded to 2 decimal places
    weightToGain: weightToGain,
    weightToLose: weightToLose,
    bmi: bmi.toFixed(2), // Rounded to 2 decimal places
    foodRecommendations: foodRecommendations,
  };
}

// Calculate BMI function
function calculateBMI(height, weight) {
  const heightInMeters = height / 100; // Convert height to meters
  return weight / (heightInMeters * heightInMeters);
}

// Get health information
const healthInfo = determineHealthState();

// Populate the table with health information
if (healthInfo) {
  document.getElementById("healthState").textContent = healthInfo.healthState;
  document.getElementById("currentWeight").textContent =
    healthInfo.currentWeight;
  document.getElementById("recommendedWeight").textContent =
    healthInfo.recommendedWeight;
  document.getElementById("weightToGain").textContent =
    healthInfo.weightToGain || "-";
  document.getElementById("weightToLose").textContent =
    healthInfo.weightToLose || "-";
  document.getElementById("bmi").textContent = healthInfo.bmi;
  document.getElementById("foodRecommendations").textContent =
    healthInfo.foodRecommendations;
} else {
  console.log("No medical data found.");
}

// Add event listener to edit button
document.getElementById("editBtn").addEventListener("click", function () {
  console.log("Redirecting to edit medical data page...");
  window.location.href = "/pages/log-in/log-in.html";
});

document.getElementById("usfel-h2").innerText +=
  " " + healthState.innerText + "ed";
console.log("Health State:");
console.log(healthState);
// ! //////////////////////////////////////
let recipeUrlEx = "";
let recipeIdEx = "";

const apiKey = "88000ac38f8ecc420d6524fbf50c91cd";
// getDataFromAPIThenDisplay("main"); //When page loaded, seearch for main to display some main or common recipes
if (healthState.innerText === "Underweight") {
  getDataFromAPIThenDisplay("Calorie-Dense");
} else if (
  healthState.innerText === "Overweight" ||
  healthState.innerText === "Obese"
) {
  getDataFromAPIThenDisplay("Non-Starchy");
} else {
  getDataFromAPIThenDisplay("normal");
}

let recipesHit = {};

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

let buttons = document.querySelectorAll(".health-lables button");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // console.log(btn.innerText);
    showLoader();
    getDataFromAPIThenDisplay(btn.innerText);
  });
});

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
        recipesHit[productCard.classList[0]].recipe.mealType,
        recipesHit[productCard.classList[0]].recipe.image,
        recipesHit[productCard.classList[0]].recipe.ingredientLines,
        recipesHit[productCard.classList[0]].recipe.url,
        extractRecipeId(recipesHit[productCard.classList[0]]._links.self.href) //This pass recipe ID
      );
    });
  });
}

// ! ! ! ! ! ! ! ! ! ! ! ! ! ! !   A.   P.   I.    ! ! ! ! ! ! ! ! ! ! ! ! ! ! !

//Search-bar uses this ƒn
function getDataFromAPIThenDisplay(query) {
  // Construct the request URL
  const requestUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=bf8d8944&app_key=${apiKey}`;

  // Make a GET request to the Edamam API
  fetch(requestUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      recipesHit = data.hits;
      // Handle the response data
      console.log(data);
      console.log(data.hits[0]);
      // console.log(data.hits[0].recipe);
      // console.log(data.hits[0].recipe);
      console.log(data.hits[0].recipe.mealType);
      console.log(data.hits[0].recipe.ingredientLines); //Array
      console.log(data.hits[0].recipe.dietLables);
      console.log(data.hits[0].recipe.image);
      console.log(data.hits[0].recipe.url);
      // Extract and use recipe data as needed
      generateProductCards(data.hits); //To Fill recipe box with API data
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      container.innerHTML = `<h3>Cannot found result for <span>"${inputVal.value}"</span>, try searching with diffrent words or check the <span>internet</span> connection <3</h3>`;
    });
}
// !RECIPE POPUP
// Get references to the elements
const smallTitleElement = document.getElementById("smallTitle");
const bigTitleElement = document.getElementById("bigTitle");
const paragraphElement = document.getElementById("paragraph");
const recipeImageElement = document.getElementById("recipeImage");
const ingredientsListElement = document.getElementById("ingredientsList");

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

function logout() {
  console.log("Logout");
  localStorage.clear();
  document.getElementById("hm-container").style.display = "block";
  document.getElementById("hm-container").style.textAlign = "center";
  document.getElementById("hm-container").innerHTML = `
  <h1>Your data was deleted, you need to sign-in again </h1>
</br>
  <h2>Redirecting to log-in page in 5 seconds.....</h2>
  `;
  setTimeout(function () {
    window.location.href = "/pages/log-in/log-in.html"; //Open login pagee
  }, 5000);
}
