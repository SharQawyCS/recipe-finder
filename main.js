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
