document.addEventListener("DOMContentLoaded", function () {
  // elements
  var ageInput = document.querySelector(".age");
  var heightInput = document.querySelector(".height");
  var weightInput = document.querySelector(".weight");
  var maleRadio = document.getElementById("radio-1");
  var femaleRadio = document.getElementById("radio-2");
  var otherRadio = document.getElementById("radio-3");

  // Check if medical data is in in local storage
  var medicalDataFromStorage = localStorage.getItem("medical-data");
  if (medicalDataFromStorage) {
    var medicalData = JSON.parse(medicalDataFromStorage);
    // Fill fields with old medical data
    ageInput.value = medicalData.age || "";
    heightInput.value = medicalData.height || "";
    weightInput.value = medicalData.weight || "";
    // Check the gender radio button if gender is saved
    if (medicalData.gender === "male") {
      maleRadio.checked = true;
    } else if (medicalData.gender === "female") {
      femaleRadio.checked = true;
    } else if (medicalData.gender === "other") {
      otherRadio.checked = true;
    }
  }

  // submit button
  document.querySelector(".login_btn").addEventListener("click", function () {
    // Get  input values
    var age = parseInt(ageInput.value);
    var height = parseInt(heightInput.value);
    var weight = parseInt(weightInput.value);
    var gender = "";
    if (maleRadio.checked) {
      gender = "male";
    } else if (femaleRadio.checked) {
      gender = "female";
    } else if (otherRadio.checked) {
      let i = 7;
      document.querySelector(".card").innerHTML = `
      <h1 style="margin: 20px 0; color: red">${i} | REALLY!</h1>
      <h2 style="color: red">Did you really select other?</h2>
      <h3 style="color: #22313f">
        Anyway, to use this website you <span style="color: red">MUST</span> be
        male or female
      </h3>
      <h3 style="color: #22313f">
        non-binary people cannot use this website
      </h3>
      `;
      setInterval(() => {
        document.querySelector(".card").innerHTML = `
          <h1 style="margin: 20px 0; color: red">${i} | REALLY!</h1>
          <h2 style="color: red">Did you really select other?</h2>
          <h3 style="color: #22313f">
            Anyway, to use this website you <span style="color: red">MUST</span> be
            male or female
          </h3>
          <h3 style="color: #22313f">
            non-binary people cannot use this website
          </h3>
          `;
        i--;
      }, 1000);

      setTimeout(() => {
        window.location.href = "/pages/log-in/medical-info.html";
      }, 8000);

      return; // To Don't save "Other" in local storage
    }

    // Validate inputs//todo:Sharqawycs
    if (isNaN(age) || isNaN(height) || isNaN(weight)) {
      alert("Please enter valid numeric values for Age, Height, and Weight.");
      return;
    }
    if (weight < 10 || weight > 180) {
      alert("Please enter a valid weight");
      return;
    }
    if (height < 50 || height > 250) {
      alert("Please enter a valid height");
      return;
    }

    // Save data to localStorage
    var medicalData = {
      age: age,
      height: height,
      weight: weight,
      gender: gender,
    };
    localStorage.setItem("medical-data", JSON.stringify(medicalData));

    window.location.href = "/index.html";
  });
});
