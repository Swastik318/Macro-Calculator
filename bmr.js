const form = document.getElementById("bmrForm");
const result = document.getElementById("result");

form.addEventListener("submit", function(event){
    event.preventDefault()

    const heightCm = Number(document.getElementById("height").value);
    const weightKg = Number(document.getElementById("weight").value);
    const age = Number(document.getElementById("age").value);

    if(heightCm<=0||weightKg<=0){
        result.textContent = "Please enter valid height and weight";
        return;
    }

    const genders = document.getElementsByName("gender");

    let selectedGender = "";

    for (let i = 0; i < genders.length; i++) {
        if (genders[i].checked) {
            selectedGender = genders[i].value;
            break;
        }
    }

    if (selectedGender === "") {
        result.textContent = "Please select gender.";
        return;
    }

    let BMR;

    if (selectedGender === "Male") {
        BMR = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
        BMR = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }
    
    result.textContent = `Your BMR is ${BMR}`;
});