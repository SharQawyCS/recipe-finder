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
