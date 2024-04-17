console.log('loaded');
var gender = "";


function displayError(msg, errfieldID, inputID) {
    let err_msg = document.getElementById(errfieldID);
    let field = document.getElementById(inputID);
    field.style.borderColor = "transparent"
    field.style.backgroundColor = "#EEABAA"
    err_msg.style.visibility = 'visible';
    err_msg.innerHTML = msg;
}
function displayErrorBasic(msg, errfieldID) {
    let err_msg = document.getElementById(errfieldID);
    err_msg.style.visibility = 'visible';
    err_msg.innerHTML = msg;
}

function hideError(errfieldID) {
    let err = document.getElementById(errfieldID);
    err.style.visibility = 'hidden';
    err.innerHTML = "nič \n nič";
}
function validateIsEmpty(inputID) {
    let inputfield = document.getElementById(inputID);
    return !inputfield.value;
}
function validateIsShort(inputID, length){
    let inputfield = document.getElementById(inputID);
    return inputfield.value.length < length;
}
function validateIsLong(inputID, length){
    let inputfield = document.getElementById(inputID);
    return inputfield.value.length > length;
}
function validateFormat(inputID){
    let inputfield = document.getElementById(inputID);
    return !/^[\p{L}]+$/u.test(inputfield.value);
}
function validateName(inputID, errfieldID){
   if (validateIsEmpty(inputID)){
       displayError("Musí byť vyplnené", errfieldID, inputID);
       return false;
   } else if(validateIsShort(inputID, 2)){
        displayError("Príliš málo znakov", errfieldID, inputID);
       return false;
   } else if (validateIsLong(inputID, 30)){
       displayError("Príliš veľa znakov", errfieldID, inputID);
       return false;
    } else if (validateFormat(inputID)){
        displayError("Musí obsahovať len písmená", errfieldID, inputID);
       return false;
   } else {
       hideError(errfieldID);
       activateCorrectColor(inputID)
       return true;
   }
}

let birthdate = document.getElementById('birthdate');
birthdate.addEventListener("change", (event) => {
    let bday = new Date(event.target.value); // hodnota input fieldu od pouzivatela cize jeho datum narodenia
    let today = new Date(); //dnesny datum

    let age = today.getFullYear() - bday.getFullYear();
    let month = today.getMonth() - bday.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < bday.getDate())) {
        age -= 1;
    }

    if ( age < 18){
        displayError("Nedostatočný vek", "err-age", 'age');
    } else if (age > 120){
        displayError("Maximálny vek: 120", "err-age", 'age');
    } else {
        hideError("err-age");
        activateCorrectColor('age');
    }

    let ageinput = document.getElementById('age');
    ageinput.value = age;
    ageinput.setAttribute('disabled', 'true');

});
function validateAge(inputID, errID){
    let age = document.getElementById(inputID).value;
    if ( age <= 120 && age >= 18){
        return true;
    } else if (age > 120 || age < 18){
        displayError("Vyplň správny vek", errID, inputID)
        return false;
    } else {
        displayError("Vyplň správny vek", errID, inputID)
        return false;
    }
}

function resetExtraGenders(){
    let extraGenders = document.getElementById('another_genders')
    extraGenders.selectedIndex = 0;

}
function validateGenderButton(radioID){
    hideError("err-gender");
    let selectElement = document.getElementById('extra_genders');
    let maleLabel = document.getElementById('label_male');
    let femaleLabel = document.getElementById('label_female');
    let anotherLabel = document.getElementById('label_another');
    maleLabel.style.color = 'grey'
    femaleLabel.style.color = 'grey'
    anotherLabel.style.color = 'grey'
    if(radioID === "gender_another"){
        selectElement.style.visibility = "visible"
        anotherLabel.style.color = 'black'
    } else {
        selectElement.style.visibility = "hidden"
        resetExtraGenders();
        if(radioID === "gender_male"){
            maleLabel.style.color = 'black'
        } else{
            femaleLabel.style.color = 'black'
        }
    }
}
function validateGenderPick(){
    hideError("err-gender");
    let male = document.getElementById('gender_male')
    let female = document.getElementById('gender_female')
    let another = document.getElementById('gender_another')
    let extraGender = document.getElementById('another_genders')
    if(male.checked){
        gender = "muž";
        return true;
    } else if (female.checked){
        gender = "žena";
        return true;
    } else if (another.checked){
        if(extraGender.value === 'muž'){
            gender = "muž";
            return true;
        } else if (extraGender.value === 'žena'){
            gender = "žena";
            return true;
        } else {
            displayErrorBasic("Vyber si pohlavie", 'err-gender');
            return false;
        }
    } else {
        displayErrorBasic("Vyber si pohlavie", 'err-gender');
        return false;
    }
}
function validateEmail(inputID,errfieldID){
    let emailInput = document.getElementById(inputID).value;
    const emailPattern = /^[A-Za-z0-9._%+-]{3,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (validateIsEmpty(inputID)){
        displayError("Musí byť vyplnené", errfieldID, inputID);
        return false;
    }else if (!emailPattern.test(emailInput)){
        displayError("Zlý formát (aaa@x.yy)",errfieldID, inputID);
        return false;
    } else {
        hideError(errfieldID);
        activateCorrectColor(inputID)
        return true;
    }
}
function validatePhone(inputID,errfieldID){
    let phoneInput = document.getElementById(inputID).value;
    const phonePattern = /^\+421\d{9}$/;
    if (validateIsEmpty(inputID)){
        displayError("Musí byť vyplnené", errfieldID, inputID);
        return false;
    }else if (!phonePattern.test(phoneInput)){
        displayError("Neplatné SK číslo (+421...)",errfieldID, inputID);
        return false;
    } else {
        hideError(errfieldID);
        activateCorrectColor(inputID)
        return true;
    }
}
function validateButton(){
    let hiddenMessage = document.getElementById('hiddenMessage');
    if(hiddenMessage.hidden === true){
        hiddenMessage.hidden = false;
    }else{
        hiddenMessage.hidden = true;
    }
}
const firstSelect = document.getElementById("mark");
const secondSelect = document.getElementById("model");
const thirdSelect = document.getElementById("engine");

const optionsForModelSelect = {
    alfa:["Tonale", "Stelvio", "Giulia"],
    fiat:["500", "Tipo", "Spider"],
    jeep:["Compass","Renegade","Wrangler"]
};
const optionsForMotorSelect= {
    Tonale:["1.3 Benzín","1.5 Benzín","1.6 Diesel"],
    Stelvio:["2.0 Benzín","2.9 Benzín","2.2 Diesel"],
    Giulia:["2.0 Benzín","2.9 Benzín","2.2 Diesel"],
    500:["0.9 Benzín","1.2 Benzín"],
    Tipo:["1.5 Diesel"],
    Spider:["1.4 Benzín"],
    Compass:["1.3 Benzín","2.0 Benzín", "1.6 Diesel"],
    Renegade:["1.3 Benzín"],
    Wrangler:["2.0 Benzín","3.6 Benzín","3.0 Diesel"]
};
function calculatePrice(){
    let model = secondSelect.value;
    let engine = thirdSelect.value;

    switch (model){
        case'Tonale':
            if(engine === '1.3 Benzín'){
                return 35000;
            } else if(engine === '1.5 Benzín'){
                return 39000;
            } else {
                return 38000;
            }
        case'Stelvio':
            if(engine === '2.0 Benzín'){
                return 63000;
            } else if(engine === '2.9 Benzín'){
                return 91000;
            } else {
                return 55000;
            }
        case'Giulia':
            if(engine === '2.0 Benzín'){
                return 52000;
            } else if(engine === '2.9 Benzín'){
                return 87000;
            } else {
                return 45000;
            }
        case'500':
            if(engine === '0.9 Benzín'){
                return 21000;
            } else {
                return 23000;
            }
        case'Tipo':
            return 18000;
        case'Spider':
            return 27000;
        case'Compass':
            if(engine === '1.3 Benzín'){
                return 50000;
            } else if(engine === '2.0 Benzín'){
                return 59000;
            } else {
                return 53000;
            }
        case'Renegade':
            return 40000;
        case'Wrangler':
            if(engine === '2.0 Benzín'){
                return 63000;
            } else if(engine === '3.6 Benzín'){
                return 91000;
            } else {
                return 72000;
            }
    }
}
function showPrice(){
    hideError('err-car');
    let sum = calculatePrice();
    let price = document.getElementById("price");
    price.innerHTML = "Cena: " +sum+"€";
    price.style.visibility = "visible";

}
function hidePrice(){
    document.getElementById("price").style.visibility = "hidden";

}

function showSecondSelect(){
    hideError('err-car');
    let selectedOption = firstSelect.value;
    if(selectedOption === ""){
        secondSelect.innerHTML = "";
    } else {
        let options = optionsForModelSelect[selectedOption] || [];
        secondSelect.innerHTML = "";
        let  optionElement = new Option("Model", "none",true, true);
        optionElement.disabled = true;
        secondSelect.appendChild(optionElement);
        options.forEach(option => {
            let  optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            secondSelect.appendChild(optionElement);
        });
        document.getElementById('model_div').style.visibility = "visible";

        thirdSelect.innerHTML = "";
        document.getElementById('engine_div').style.visibility = "hidden";
        hidePrice();
    }

}
function  showThirdSelect(){
    hideError('err-car');
    let selectedOption = secondSelect.value;
    let options = optionsForMotorSelect[selectedOption] || [];
    thirdSelect.innerHTML = "";
    let  optionElement = new Option("Motor", "none",true, true);
    optionElement.disabled = true;
    thirdSelect.appendChild(optionElement);
    options.forEach(option => {
        let optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        thirdSelect.appendChild(optionElement);
    });
    document.getElementById('engine_div').style.visibility = "visible";
    hidePrice();
}
function validateExtraCheckbox(inputID,outputLabel){
    let checkBox = document.getElementById(inputID);
    let label = document.getElementById(outputLabel);
    if (checkBox.checked){
        label.style.color = 'black';
        if(inputID === "else"){
            document.getElementById("extraElse").style.visibility = "visible";
        }
    } else {
        label.style.color = 'grey';
        if(inputID === "else"){
            document.getElementById("extraElse").style.visibility = "hidden";
            document.getElementById("extraElse").value = "";
        }
    }
}
function confirmCheckbox(inputID){
    let checkBox = document.getElementById(inputID);
    if (checkBox.checked){
        return true;
    } else {
        return false;
    }
}
function validateCarPicked(){
    let Mark = document.getElementById('mark');
    let Car = document.getElementById('model');
    let Engine = document.getElementById('engine');

    if(Mark.value === "none" || Car.value === "none" || Engine.value === "none"){
        displayErrorBasic('Vyber si typ auta', 'err-car');
        return false;
    } else {
        return  true;
    }
}
function activateInputColor(ID){
    document.getElementById(ID).style.backgroundColor = "#e8f0fe";
    document.getElementById(ID).style.borderColor = "transparent"
}
function deactivateInputColor(ID){
    document.getElementById(ID).style.backgroundColor = "whitesmoke";
    document.getElementById(ID).style.borderColor = "transparent"
}

function activateCorrectColor(ID){
    document.getElementById(ID).style.backgroundColor = "#e8f0fe";
    document.getElementById(ID).style.borderColor = "transparent"
}
function tryToOpenModal(){
    if(validateName('firstname', 'err-firstname') && validateName('surname', 'err-surname') &&
        validateAge('age', 'err-age') && validateGenderPick() && validateEmail('email','err-email') &&
        validatePhone('phone','err-phone') && validateCarPicked()){
        openModal();
    }
}
function openModal(){
    let modal= document.getElementById('Modal');
    let modalClose = document.getElementsByClassName("modalClose")[0];
    let modalName= document.getElementById('modalName');
    let modalSurname= document.getElementById('modalSurname');
    let modalBirthdate= document.getElementById('modalBirthdate');
    let modalAge= document.getElementById('modalAge');
    let modalGender= document.getElementById('modalGender');
    let modalEmail= document.getElementById('modalEmail');
    let modalNumber= document.getElementById('modalNumber');
    let modalCar= document.getElementById('modalCar');
    let modalExtra= document.getElementById('modalExtra');
    let modalQuestion= document.getElementById('modalQuestion');
    let modalPrice= document.getElementById('modalPrice');
    let arr = [];

    modalName.innerHTML = 'Meno: ' + document.getElementById('firstname').value;
    modalSurname.innerHTML = 'Priezvisko: ' + document.getElementById('surname').value;
    modalBirthdate.innerHTML = 'Dátum narodenia: ' + document.getElementById('birthdate').value;
    modalAge.innerHTML = 'Vek: ' + document.getElementById('age').value;
    modalGender.innerHTML = 'Pohlavie: ' + gender;
    modalEmail.innerHTML = 'Email: ' + document.getElementById('email').value;
    modalNumber.innerHTML = 'Tel: ' + document.getElementById('phone').value;
    modalCar.innerHTML = 'Auto: ' + document.getElementById('mark').value + ' ' + document.getElementById('model').value +
                            ' ' + document.getElementById('engine').value;
    modalQuestion.innerHTML = 'Otázka na predajcu: ' + document.getElementById('question').value;
    modalPrice.innerHTML = 'Cena: ' + calculatePrice();
    document.getElementById('priceToSend').value = calculatePrice();
    document.getElementById('ageHidden').value = document.getElementById('age').value;

    if(confirmCheckbox('leasing')){
        arr.push('Financovanie \n');
    }
    if(confirmCheckbox('sellIn')){
        arr.push('Výkup starého \n');
    }
    if(confirmCheckbox('warranty')){
        arr.push('Predĺžená záruka \n');
    }
    if(confirmCheckbox('customized')){
        arr.push('Úprava interíeru \n');
    }
    if(confirmCheckbox('else')){
        arr.push(document.getElementById('extraElse').value + '\n');
    }

    modalExtra.innerHTML = 'Doplnkové služby: ' + arr;

    modal.style.display = 'block';
    modalClose.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}


function validateForm() {}