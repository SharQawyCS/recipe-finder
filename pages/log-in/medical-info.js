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
