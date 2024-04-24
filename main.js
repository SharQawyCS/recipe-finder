const apiKey = "88000ac38f8ecc420d6524fbf50c91cd";
getDataFromAPIThenDisplay("main"); //When page loaded, seearch for main to display some main or common recipes

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

//Search bar
let inputVal = document.querySelector(".input-box input");
const button = document.querySelector(".button");

button.addEventListener("click", () => {
  getDataFromAPIThenDisplay(inputVal.value);
});

//Generate recipe box
// Function to generate product cards
const container = document.getElementById("product-container");
function generateProductCards(products) {
  container.innerText = ""; //To delete the old results before Displying new results
  products.forEach((product) => {
    const productCard = document.createElement("div");
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
  });
}

// generateProductCards(products);

document.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains("fa-heart")) {
    clickedElement.classList.toggle("full");
  }
});

// ! ! ! ! ! ! ! ! ! ! ! ! ! ! !   A.   P.   I.    ! ! ! ! ! ! ! ! ! ! ! ! ! ! !

//Search-bar uses this ƒn
function getDataFromAPIThenDisplay(query) {
  // Construct the request URL
  const requestUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=bf8d8944&app_key=${apiKey}`;

  // const requestUrl = `https://api.edamam.com/api/recipes/v2/8d3e4b9299664a1ca8e6f5bdb8532300?type=public&app_id=bf8d8944&app_key=88000ac38f8ecc420d6524fbf50c91cd`;

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
      console.log(data);
      console.log(data.hits[0]);
      // console.log(data.hits[0].recipe);
      // console.log(data.hits[0].recipe);
      console.log(data.hits[0].recipe.mealType);
      console.log(data.hits[0].recipe.ingredientLines); //Array
      console.log(data.hits[0].recipe.dietLables);
      console.log(data.hits[0].recipe.image);
      console.log(data.hits[0].recipe.totalTime);
      // Extract and use recipe data as needed
      generateProductCards(data.hits); //To Fill recipe box with API data
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      container.innerHTML = `<h3>Cannot found result for <span>"${inputVal.value}"</span>, try searching with diffrent words <3</h3>`;
    });
}
