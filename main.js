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
const button = document.querySelector(".button");

button.addEventListener("mousedown", () => button.classList.add("clicked"));

//Generate recipe box
// Function to generate product cards
function generateProductCards(products) {
  const container = document.getElementById("product-container");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productImgContainer = document.createElement("div");
    productImgContainer.classList.add("product-img-container");
    const productImg = document.createElement("div");
    productImg.classList.add("product-img");
    productImg.style.backgroundImage = `url(${product.imgSrc})`;
    productImgContainer.appendChild(productImg);

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");
    const productTitle = document.createElement("h2");
    productTitle.classList.add("product-title");
    productTitle.textContent = product.title;
    const productDescription = document.createElement("p");
    productDescription.classList.add("product-description");
    productDescription.textContent = product.description;
    const productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent = product.price;
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("icon-container");
    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fas", "fa-heart");
    const cartIcon = document.createElement("i");
    cartIcon.classList.add("fas", "fa-shopping-cart", "cart-icon");

    iconContainer.appendChild(heartIcon);
    iconContainer.appendChild(cartIcon);
    productInfo.appendChild(productTitle);
    productInfo.appendChild(productDescription);
    productInfo.appendChild(productPrice);
    productInfo.appendChild(iconContainer);

    productCard.appendChild(productImgContainer);
    productCard.appendChild(productInfo);

    container.appendChild(productCard);
  });
}

// Sample data
const products = [
  {
    title: "Nike Shoes",
    description: "High-quality Nike shoes for your active lifestyle.",
    price: "$129.99",
    imgSrc: "./imgs/hp_img.jpg",
  },
  {
    title: "Adidas Jacket",
    description: "Stylish Adidas jacket to keep you warm.",
    price: "$89.99",
    imgSrc: "https://via.placeholder.com/300",
  },
  {
    title: "Puma Backpack",
    description: "Durable Puma backpack for all your essentials.",
    price: "$49.99",
    imgSrc: "https://via.placeholder.com/300",
  },
  {
    title: "Nike Shoes",
    description: "High-quality Nike shoes for your active lifestyle.",
    price: "$129.99",
    imgSrc: "./imgs/hp_img.jpg",
  },
  {
    title: "Adidas Jacket",
    description: "Stylish Adidas jacket to keep you warm.",
    price: "$89.99",
    imgSrc: "https://via.placeholder.com/300",
  },
  {
    title: "Puma Backpack",
    description: "Durable Puma backpack for all your essentials.",
    price: "$49.99",
    imgSrc: "https://via.placeholder.com/300",
  },
];

// Call the function with sample data
generateProductCards(products);

document.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains("fa-heart")) {
    clickedElement.classList.toggle("full");
  }
});

// ! ! ! ! ! ! ! ! ! ! ! ! ! ! !   A.   P.   I.    ! ! ! ! ! ! ! ! ! ! ! ! ! ! !

// Set up variables
const apiKey = "88000ac38f8ecc420d6524fbf50c91cd";
const query = "chicken"; // Example query for chicken recipes

// Construct the request URL
// const requestUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=bf8d8944&app_key=${apiKey}`;
const requestUrl = `https://api.edamam.com/api/recipes/v2/8d3e4b9299664a1ca8e6f5bdb8532300?type=public&app_id=bf8d8944&app_key=88000ac38f8ecc420d6524fbf50c91cd`;

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
    console.log(data.hits[0]);
    // console.log(data.hits[0].recipe);
    // console.log(data.hits[0].recipe);
    console.log(data.hits[0].recipe.mealType);
    console.log(data.hits[0].recipe.ingredientLines); //Array
    console.log(data.hits[0].recipe.dietLables);
    console.log(data.hits[0].recipe.image);
    console.log(data.hits[0].recipe.totalTime);
    // Extract and use recipe data as needed
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
