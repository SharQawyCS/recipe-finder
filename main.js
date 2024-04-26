let recipeUrlEx = "";
let recipeIdEx = "";

const apiKey = "88000ac38f8ecc420d6524fbf50c91cd";
getDataFromAPIThenDisplay("main"); //When page loaded, seearch for main to display some main or common recipes
let recipesHit = {};

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

//Search bar
let inputVal = document.querySelector(".input-box input");
const button = document.querySelector(".button");

button.addEventListener("click", () => {
  //To ensxure that user enter anything
  if (inputVal.value) {
    showLoader();
    getDataFromAPIThenDisplay(inputVal.value);
  }
});

let buttons = document.querySelectorAll(".health-lables button");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    showLoader();
    getDataFromAPIThenDisplay(btn.innerText);
  });
});

//Loader functions
const loader = document.getElementById("loader-container");
function showLoader() {
  loader.style.display = "block";
}
function hideLoader() {
  loader.style.display = "none";
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
      hideLoader();
      recipesHit = data.hits;
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

  // delete old ingredients
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

//Extract ID from the url //todo:Sharqawycs
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
  // bring the current favRecipes from local storage
  let favRecipes = JSON.parse(localStorage.getItem("favRecipes")) || [];

  // Check if recipeIdEx is in favRecipes
  const index = favRecipes.indexOf(recipeIdEx);

  if (index !== -1) {
    // RecipeIdEx is in favRecipes, then remove it
    favRecipes.splice(index, 1);
    btn1.classList.remove("in-fav");
  } else {
    // RecipeIdEx is not in favRecipes, so add it
    favRecipes.push(recipeIdEx);
    btn1.classList.add("in-fav");
  }

  // Save the updated favRecipes in local storage
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

// !Chatbot
const toggleBotBtn = document.getElementById("show-bot-btn");
const botContainer = document.getElementById("chat-bot-container");

toggleBotBtn.addEventListener("click", () => {
  if (botContainer.style.display == "block") {
    botContainer.style.display = "none";
    document.body.style.overflow = "scroll"; // Prevetn scrolling of the main page
  } else {
    botContainer.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevetn scrolling of the main page
  }
});

var messages = [
  `Hello there! I'm Recipe AI, your nutrition assistant. How can I help you today?
  You can send "exit" to end the chat or "restart" to restart the chat`,

  "What kind of meals are you interested in?",
  "When planning meals, aim for a balance of protein, carbohydrates, and healthy fats. Incorporate plenty of vegetables, whole grains, and lean protein sources like poultry, fish, tofu, or beans.",
  "Do you have any specific dietary goals?",
  "If you're looking to lose weight, focus on creating a calorie deficit by choosing nutrient-dense, lower-calorie foods and controlling portion sizes. Remember to prioritize whole, unprocessed foods over highly processed options.",
  "What challenges are you facing in your quest for a healthier lifestyle?",
  "If you're struggling to stay motivated, try setting realistic, achievable goals for yourself and celebrating small victories along the way. Surround yourself with supportive friends and family who can help keep you accountable and motivated.",
  "What's your favorite type of cuisine?",
  "Regardless of your favorite cuisine, you can always find ways to make it healthier! Look for recipes that incorporate plenty of vegetables, lean proteins, and whole grains. Experiment with herbs and spices to add flavor without extra calories.",
  "Are you currently following any specific diet plan?",
  "No matter what diet plan you're following, it's important to focus on nutrient density and overall balance. Make sure you're getting all the essential nutrients your body needs to thrive, and don't forget to enjoy treats in moderation!",
  "What are your favorite healthy snacks?",
  "When choosing snacks, opt for whole foods like fruits, vegetables, nuts, and yogurt. These options are nutrient-dense and can help keep you feeling satisfied between meals without loading up on empty calories.",
  "Do you struggle with portion control?",
  "If portion control is a challenge for you, try using smaller plates and bowls to help control portion sizes. Also, pay attention to your hunger and fullness cues, and try to eat slowly to give your body time to register when you're satisfied.",
  "How do you deal with cravings for unhealthy foods?",
  "When cravings strike, try distracting yourself with a healthy activity like going for a walk, drinking a glass of water, or chewing sugar-free gum. You can also try swapping unhealthy snacks for healthier alternatives to satisfy your cravings without derailing your diet.",
  "Are you getting enough fruits and vegetables in your diet?",
  "Fruits and vegetables are packed with essential vitamins, minerals, and fiber, so it's important to include plenty of them in your diet. Aim for at least 5 servings of fruits and vegetables per day, and try to include a variety of colors to ensure you're getting a wide range of nutrients.",
  "How do you handle eating out at restaurants while trying to eat healthy?",
  "When dining out, look for restaurants that offer healthier options like grilled or steamed dishes, salads, and vegetable-based sides. You can also ask for dressings and sauces on the side, and consider sharing entrees or ordering half portions to help control portion sizes.",
  "What's your go-to healthy breakfast?",
  "Starting your day with a nutritious breakfast is important for fueling your body and jumpstarting your metabolism. Try to include a mix of protein, fiber, and healthy fats in your breakfast, such as oatmeal topped with fruit and nuts, Greek yogurt with granola and berries, or scrambled eggs with vegetables.",
  "How do you stay motivated to eat healthy?",
  "Staying motivated can be challenging, but setting clear, achievable goals can help keep you on track. Surround yourself with positive influences, like friends who share your healthy lifestyle goals, and celebrate your successes along the way.",
  "What's your favorite way to stay active?",
  "Finding activities you enjoy is key to sticking with an exercise routine. Whether it's walking, dancing, swimming, or practicing yoga, choose activities that you look forward to and that fit into your lifestyle.",
  "Do you have any strategies for staying hydrated throughout the day?",
  "If you struggle to drink enough water, try carrying a reusable water bottle with you wherever you go and setting reminders on your phone to drink water throughout the day. You can also infuse your water with fruits or herbs for added flavor.",
  "How do you handle social situations where unhealthy food choices are prevalent?",
  "In social situations, focus on enjoying the company of friends and family rather than fixating on food. If you're attending a gathering where unhealthy options are available, try eating a healthy snack beforehand to curb your appetite and make mindful choices when it comes to indulging.",
  "What's your approach to meal planning and preparation?",
  "Meal planning can help you save time and money while ensuring you have nutritious meals on hand throughout the week. Set aside some time each week to plan your meals, make a grocery list, and prep ingredients in advance to streamline the cooking process.",
  "How do you handle cravings for sugary or processed foods?",
  "When cravings strike, try satisfying your sweet tooth with naturally sweet foods like fruit or a small piece of dark chocolate. You can also try distracting yourself with a healthy activity or reaching for a satisfying protein-rich snack like nuts or Greek yogurt.",
  "What are your favorite ways to incorporate more vegetables into your meals?",
  "Get creative with your vegetable intake by experimenting with different cooking methods and flavor combinations. Try roasting vegetables with herbs and spices, adding them to soups and stews, or incorporating them into salads, stir-fries, and grain bowls.",
  "How do you handle food cravings late at night?",
  "Late-night cravings can be tough to resist, but it's important to listen to your body's hunger cues and make mindful choices. If you find yourself craving snacks before bed, opt for light, nutrient-dense options like a small piece of fruit, a handful of nuts, or a cup of herbal tea.",
  "What are your strategies for staying on track with your nutrition goals while traveling?",
  "When traveling, plan ahead by packing healthy snacks and researching restaurants that offer nutritious options. Focus on making balanced choices when dining out, and aim to stay active by walking or exploring your destination on foot.",
  "Chat Ended, I wish I've helped you :)",
];

var currentMessageIndex = 0;

function sendMessage() {
  var input = document.getElementById("messageInput");
  var message = input.value;
  if (message.trim() === "") {
    return; //STOP
  } else if (message.trim() == "exit") {
    input.value = "";
    exitChatbot();
    addIncomingMessage("Chat ended");
    return;
  } else if (message.trim() == "restart") {
    input.value = "";
    restartChatbot();
    return;
  }

  addOutgoingMessage(message);

  input.value = "";
  setTimeout(sendAutoReply, 1000);
}

function sendAutoReply() {
  if (currentMessageIndex < messages.length) {
    addIncomingMessage(messages[currentMessageIndex]);
    currentMessageIndex++;
  }
}

function addOutgoingMessage(message) {
  var chatContainer = document.getElementById("chatContainer");
  var outgoingMessage = document.createElement("div");

  outgoingMessage.classList.add("message", "outgoing");
  outgoingMessage.innerHTML = `

    <img style="width:25px; height:25px;" src="/imgs/profile-user-2.png" alt="Avatar" class="message-avatar">
    <div class="message-content">${message}</div>
    <div class="message-time">${getCurrentTime()}</div>
  `;
  chatContainer.appendChild(outgoingMessage);
}

function addIncomingMessage(message) {
  var chatContainer = document.getElementById("chatContainer");
  var incomingMessage = document.createElement("div");

  incomingMessage.classList.add("message", "incoming");
  incomingMessage.innerHTML = `

    <img style="width:25px; height:25px;" src="/imgs/chatbot.png" alt="Avatar" class="message-avatar">
    <div class="message-content">${message}</div>
    <div class="message-time">${getCurrentTime()}</div>
  `;
  chatContainer.appendChild(incomingMessage);
}

function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

sendAutoReply();

//Function to exit the bot
function exitChatbot() {
  var chatContainer = document.getElementById("chatContainer");
  chatContainer.innerHTML = "";
  currentMessageIndex = 0;
}

//Function to restart the bot
function restartChatbot() {
  exitChatbot();
  sendAutoReply();
}
