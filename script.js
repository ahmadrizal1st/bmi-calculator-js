let age = document.getElementById("age");
let height = document.getElementById("height");
let weight = document.getElementById("weight");
let male = document.getElementById("male");
let female = document.getElementById("female");
let resultArea = document.querySelector(".comment");

let modalContent = document.querySelector(".modal-content");
let modalText = document.querySelector("#modal-text");
let modal = document.getElementById("modal");
let span = document.getElementsByClassName("close-button")[0];

function calculate() {
  if (
    age.value == "" ||
    height.value == "" ||
    weight.value == "" ||
    (male.checked == false && female.checked == false)
  ) {
    modal.style.display = "block";
    if (age.value <= 0 && height.value <= 0 && weight.value <= 0) {
      modalText.innerHTML = `Values must be greater than 0!`;
    } else {
      modalText.innerHTML = `All fields are required!`;
    }
  } else {
    countBmi();
  }
}

/**
 * Calculates the Body Mass Index (BMI) based on user input values for age, height, weight, and gender.
 * Displays the BMI result along with a corresponding health status message and color-coded result.
 * 
 * The function retrieves values from input fields for age, height, weight, and gender (male or female).
 * It then calculates the BMI using the formula: weight (kg) / (height (m) * height (m)).
 * Based on the BMI value, it determines the health status category:
 * - Underweight (BMI < 18.5)
 * - Healthy (18.5 <= BMI <= 24.9)
 * - Overweight (25 <= BMI <= 29.9)
 * - Obese (30 <= BMI <= 34.9)
 * - Extremely Obese (BMI >= 35)
 * 
 * The function updates the display area with the BMI result, health status message, and appropriate color.
 */
function countBmi() {
  let p = [age.value, height.value, weight.value];
  if (male.checked) {
    p.push("male");
  } else if (female.checked) {
    p.push("female");
  }

  let bmi = Number(p[2]) / (((Number(p[1]) / 100) * Number(p[1])) / 100);

  let result = "";
  let color = "";
  if (bmi < 18.5) {
    result = "Underweight";
    color = "blue";
  } else if (18.5 <= bmi && bmi <= 24.9) {
    result = "Healthy";
    color = "green";
  } else if (25 <= bmi && bmi <= 29.9) {
    result = "Overweight";
    color = "yellow";
  } else if (30 <= bmi && bmi <= 34.9) {
    result = "Obese";
    color = "orange";
  } else if (35 <= bmi) {
    result = "Extremely Obese";
    color = "red";
  }

  resultArea.style.display = "block";
  resultArea.style.color = color;
  resultArea.style.fontSize = "30px";
  document.querySelector(".comment").innerHTML = `You are ${result}`;
  document.querySelector("#bmi-result").innerHTML = bmi.toFixed(2);
}

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function clearFields() {
  age.value = "";
  height.value = "";
  weight.value = "";
  male.checked = false;
  female.checked = false;
  resultArea.style.display = "none";
  document.querySelector("#bmi-result").innerHTML = "00.00";
  document.querySelector(".comment").innerHTML = "";
}

document.getElementById("clear").addEventListener("click", clearFields);
