const form = document.getElementById("bmiForm");
const result = document.getElementById("result");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const heightCm = Number(document.getElementById("height").value);
  const weightKg = Number(document.getElementById("weight").value);

  if (heightCm <= 0 || weightKg <= 0) {
    result.textContent = "Please enter valid height and weight.";
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const bmiValue = bmi.toFixed(2);

  let category = "";

  if (bmi < 16) {
  category = "Severely Underweight";
} else if (bmi < 18.5) {
  category = "Underweight";
} else if (bmi < 25) {
  category = "Healthy Weight";
} else if (bmi < 30) {
  category = "Overweight";
} else {
  category = "Obese";
}

if (category === "Healthy Weight") {
  result.style.color = "green";
} else if (category === "Underweight" || category === "Severely Underweight") {
  result.style.color = "orange";
} else {
  result.style.color = "red";
}


  result.textContent = `Your BMI is ${bmiValue} (${category})`;
});

