// console.log("object")
// var submitButton = document.querySelector(".login_btn");

// submitButton.addEventListener("click", function (event) {
//   event.preventDefault(); // Prevent the form from submitting
//   // Get form input values
//   let age = parseInt(document.querySelector(".age").value);
//   let height = parseInt(document.querySelector(".height").value);
//   let weight = parseInt(document.querySelector(".weight").value);
//   let gender = document.querySelector('input[name="gender"]:checked').value;

//   // Validate form inputs (example validation)
//   if (isNaN(age) || isNaN(height) || isNaN(weight)) {
//     alert("Please enter valid numeric values for Age, Height, and Weight.");
//     return;
//   }

//   // Save form data to localStorage
//   var medicalData = {
//     age: age,
//     height: height,
//     weight: weight,
//     gender: gender,
//   };
//   localStorage.setItem("medical-data", JSON.stringify(medicalData));

//   // Redirect to Facebook
//   alert("Done");
//   window.location.href = "https://www.facebook.com/";
// });

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".login_btn").addEventListener("click", function () {
    // Get form input values
    var age = parseInt(document.querySelector(".age").value);
    var height = parseInt(document.querySelector(".height").value);
    var weight = parseInt(document.querySelector(".weight").value);
    var gender = document.querySelector('input[name="radio"]:checked').value;

    // Validate form inputs (example validation)
    if (isNaN(age) || isNaN(height) || isNaN(weight)) {
      alert("Please enter valid numeric values for Age, Height, and Weight.");
      return;
    }

    // Save form data to localStorage
    var medicalData = {
      age: age,
      height: height,
      weight: weight,
      gender: gender,
    };
    localStorage.setItem("medical-data", JSON.stringify(medicalData));

    // Redirect to homepage (replace "homepage.html" with your actual homepage URL)
    window.location.href = "/index.html";
  });
});
