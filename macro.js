const form = document.getElementById("MacroForm");

const calorie = document.getElementById("calorie");
const protein = document.getElementById("protein");
const carb = document.getElementById("carb");
const fats = document.getElementById("fats");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // ---- Inputs ----
  const age = Number(document.getElementById("age").value);
  const height = Number(document.getElementById("height").value);
  const weight = Number(document.getElementById("weight").value);

  // ---- Gender ----
  const genders = document.getElementsByName("gender");
  let selectedGender = "";

  for (let i = 0; i < genders.length; i++) {
    if (genders[i].checked) {
      selectedGender = genders[i].value;
      break;
    }
  }

  // ---- Validation ----
  if (age <= 0 || height <= 0 || weight <= 0) {
    calorie.textContent = "Please enter valid age, height and weight";
    protein.textContent = "";
    carb.textContent = "";
    fats.textContent = "";
    return;
  }

  if (selectedGender === "") {
    calorie.textContent = "Please select gender";
    protein.textContent = "";
    carb.textContent = "";
    fats.textContent = "";
    return;
  }

  // ---- Activity ----
  const activity = document.getElementById("activity").value;
  let activityMultiplier;

  if (activity === "sedentary") activityMultiplier = 1.2;
  else if (activity === "light") activityMultiplier = 1.375;
  else if (activity === "moderate") activityMultiplier = 1.55;
  else if (activity === "active") activityMultiplier = 1.725;
  else if (activity === "very_active") activityMultiplier = 1.9;
  else if (activity === "extra_active") activityMultiplier = 2.1;

  // ---- Goal ----
  const goal = document.getElementById("goal").value;
  let calorieAdjustment;

  if (goal === "maintain") calorieAdjustment = 0;
  else if (goal === "loss_250") calorieAdjustment = -250;
  else if (goal === "loss_500") calorieAdjustment = -500;
  else if (goal === "loss_1000") calorieAdjustment = -1000;
  else if (goal === "gain_250") calorieAdjustment = 250;
  else if (goal === "gain_500") calorieAdjustment = 500;
  else if (goal === "gain_1000") calorieAdjustment = 1000;

  // ---- BMR ----
  let bmr;
  if (selectedGender === "Male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // ---- Final Calories ----
  const tdee = bmr * activityMultiplier;
  const finalCalorie = tdee + calorieAdjustment;

  // ---- Macros ----
  const pro = weight * 1.6;
  const proMin = weight * 1.2;
  const proMax = weight * 2;

  const carbo = (finalCalorie * 0.5) / 4;
  const fat = (finalCalorie * 0.3) / 9;

  // ---- Output (rounded) ----
  calorie.textContent = `Your daily calorie requirement is ${Math.round(finalCalorie)} kcal`;
  protein.textContent = `Protein: ${Math.round(pro)} g (min ${Math.round(
    proMin
  )} g, max ${Math.round(proMax)} g)`;
  carb.textContent = `Carbohydrates: ${Math.round(carbo)} g`;
  fats.textContent = `Fats: ${Math.round(fat)} g`;
});