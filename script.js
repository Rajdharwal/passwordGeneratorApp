
const copyBtn = document.querySelector('[data-copy]');
const copyMsg = document.querySelector('[data-copyMsg]');
const passwordDisplay = document.querySelector('[data-passwordDisplay]');
const lenghtDisplay = document.querySelector('[password-lenght]');
const inputSlider = document.querySelector('[data-lengthSlider]');
const upperCaseCheck = document.querySelector('[uper-case-check]');
const lowerCaseCheck = document.querySelector('[lower-case-check');
const numberCheck = document.querySelector('[include-number');
const symbolCheck = document.querySelector('[include-symbols');
const indicator = document.querySelector('[password-strength]');
const generateBtn = document.querySelector('[generate-password]');
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

//initially 
let password = "";
let passwordLength = 10;
let checkCount = 1;

handleSlider();

//starting strenght circle color to grey
setIndicator("#ccc");


//set passwordLenght
function handleSlider(){
    inputSlider.value = passwordLength;
    // passwordLenght.vlaue = passwordLenghtNumber;
    lenghtDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max-min)) + '% 100%';

}

//set setIndicator
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(upperCaseCheck.checked) hasUpper = true;
    if(lowerCaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym)&& passwordLength >= 8){
        setIndicator("#0f0");
    }else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >=6){
        setIndicator("#ff0");

    }else{
        setIndicator("#f00");
    }
}


async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
        
    }catch(e){
        copyMsg.innerText = "Failed";
    }

    //to make copy wala span visible
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);

}

function shufflePassword(array){
    //fisher yates method
    for(let i = array.length - 1; i > 0; i--){
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i+1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = " ";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach( (checkbox) =>{
        if(checkbox.checked)
        checkCount++;
    })
}

//special condition
if(passwordLength < checkCount){
    passwordLength = checkCount;
    handleSlider();
}

allCheckBox.forEach( (checkbox) =>{
    checkbox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input', (e) =>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value)
    copyContent();
})

generateBtn.addEventListener('click', () =>{
    //none of the checkbox are selected

    if(checkCount == 0)
    return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

//     //let's start the jounery to find new password
//     console.log("starting the journey");
    //remove old password
        password = "";

//     //let's put the stuff mentioned by checkboxes

//     if(upperCaseCheck.checked){
//         password += generateUpperCase();
//     }

//     if(lowerCaseCheck.checked){
//         password += generateLowerCase();
//     }

//     if(lowerCaseCheck.checked){
//         password += generateLowerCase();
//     }

//     if(numberCheck.checked){
//         password += generateRandomNumber();
//     }

//     if(symbolCheck.checked){
//         password += generateSymbol();
//     }
// 

let funcArr = [];

if(upperCaseCheck.checked){
    funcArr.push(generateUpperCase);
}
if(lowerCaseCheck.checked){
    funcArr.push(generateLowerCase);
}
if(numberCheck.checked){
    funcArr.push(generateRandomNumber);
}

if(symbolCheck.checked){
    funcArr.push(generateSymbol);
}

//compulsory addition
for(let i=0; i<funcArr.length; i++){
    password += funcArr[i]();

}

//remaining addition
for(let i=0; i<passwordLength-funcArr.length; i++){
    let randIndex = getRndInteger(0, funcArr.length);
    password += funcArr[randIndex]();
}

//suffle the password
password = shufflePassword(Array.from(password));
//show in UI
passwordDisplay.value = password;
//caculate strength
calcStrength();

})










