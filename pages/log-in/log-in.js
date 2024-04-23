// Get references to form elements
var emailInput = document.querySelector(".email");
var usernameInput = document.querySelector(".user");
var passwordInput = document.querySelector(".pass");
var submitButton = document.querySelector(".login_btn");
let isUserDataSaved = false;

// Add event listener to the submit button
submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get values from input fields
  var email = emailInput.value.trim();
  var username = usernameInput.value.trim();
  var password = passwordInput.value.trim();

  // Simple validation
  if (email === "" || username === "" || password === "") {
    alert("Please fill in all fields.");
    return;
  }

  // Email validation using regular expression
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Password validation
  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }
  if (!/[A-Z]/.test(password)) {
    alert("Password must contain at least one uppercase letter.");
    return;
  }
  if (!/[a-z]/.test(password)) {
    alert("Password must contain at least one lowercase letter.");
    return;
  }
  if (!/\d/.test(password)) {
    alert("Password must contain at least one digit.");
    return;
  }

  // Save data to local storage
  var userData = {
    email: email,
    username: username,
    password: password,
  };
  localStorage.setItem("userData", JSON.stringify(userData));

  // Clear input fields
  emailInput.value = "";
  usernameInput.value = "";
  passwordInput.value = "";

  alert("Data saved successfully!");
  isUserDataSaved = true;

  window.location.href = "medical-info.html";
});
