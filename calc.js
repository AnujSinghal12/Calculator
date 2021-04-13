const nums = document.querySelectorAll("[data-num]");
const operators = document.querySelectorAll("[data-operator]");
const prevDisplay = document.querySelector("[data-prev]");
const currDisplay = document.querySelector("[data-current]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const equalBtn = document.querySelector("[data-equal]");
const darkModeToggle = document.querySelector(".dark-mode-toggle");




// dark mode toggle
function addDarkMode(){
    document.body.classList.remove("light-mode");
    localStorage.setItem("darkMode", "enabled");
}

function removeDarkMode(){
    document.body.classList.add("light-mode");
    localStorage.setItem("darkMode", "disabled");
}

// Check user's previous choice
let darkMode = localStorage.getItem("darkMode");
if(darkMode === "enabled"){
    addDarkMode();
}

darkModeToggle.addEventListener("click", ()=>{
    darkMode = localStorage.getItem("darkMode");
    if(darkMode === "enabled"){
        removeDarkMode();
    }
    else{
        addDarkMode();
    }
})



// Calculator class
class Calculator{
    constructor(prevDisplay, currDisplay){
        this.prevDisplay = prevDisplay;
        this.currDisplay = currDisplay;
        this.clear();
    }

    clear(){
        this.currVal = "";
        this.prevVal = "";
        this.operator = "";
    }

    delete(){
        this.currVal = this.currVal.slice(0, -1);
    }

    addNum(num){
        if(this.currVal === "0" && num === "0") return;
        if(num === "." && this.currVal.includes('.')) return;
        this.currVal = this.currVal.toString() + num.toString();
    }

    addOperator(operator){
        if(this.currVal === "") return;
        if(this.compute() !== -1){
            this.operator = operator;
            this.prevVal = this.currVal;
            this.currVal = "";        
        }
    }

    compute(){
        if(this.currVal === ""){
            return;
        }

        switch(this.operator){
            case "+":
                this.currVal = parseFloat(this.prevVal) + parseFloat(this.currVal);
                break;
            case "-":
                this.currVal = parseFloat(this.prevVal) - parseFloat(this.currVal);
                break;
            case "x":
                this.currVal = parseFloat(this.prevVal) * parseFloat(this.currVal);
                break;
            case "÷":
                if(parseFloat(this.currVal) === 0){
                    this.clear();
                    this.updateDisplay();
                    alert("Can't divide by 0");
                    return -1;
                }
                else{
                    this.currVal = parseFloat(this.prevVal) / parseFloat(this.currVal);
                }
                break;
            default:
                return;
        }
        this.prevVal = "";
        this.operator = "";
    }

    updateDisplay(){
        this.currDisplay.innerText = this.currVal;
        this.prevDisplay.innerText = `${this.prevVal} ${this.operator}`;
    }
}

calculator = new Calculator(prevDisplay, currDisplay);



nums.forEach(num => {
    num.addEventListener("click", ()=>{
        calculator.addNum(num.innerText);
        calculator.updateDisplay();
    })
})

operators.forEach(operator => {
    operator.addEventListener("click", ()=>{
        calculator.addOperator(operator.innerText);
        calculator.updateDisplay();
    })
})

allClearBtn.addEventListener("click", ()=>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener("click", ()=>{
    calculator.delete();
    calculator.updateDisplay();
})

equalBtn.addEventListener("click", ()=>{
    calculator.compute();
    calculator.updateDisplay();
})



// Taking input from keyboard
window.addEventListener("keydown", (e)=>{
    let key = e.key;

    //key for 0 to 9
    if(key>=0 && key<=9){
        calculator.addNum(key);
        calculator.updateDisplay();
        return;
    }

    switch(key){
        // key for decimal point
        case ".":                               
            calculator.addNum(".");
            calculator.updateDisplay();
            break;
        // key for backspace
        case "Backspace":
            calculator.delete();
            calculator.updateDisplay();
            break;
        // key for equals operation (Enter key)
        case "=":
        case "Enter":
            calculator.compute();
            calculator.updateDisplay();
            break;
        // delete button for all clear
        case "Delete":
            calculator.clear();
            calculator.updateDisplay();
            break;
        // subtraction
        case "-":
            calculator.addOperator("-");
            calculator.updateDisplay();
            break;
        // division
        case "/":
            calculator.addOperator("÷");
            calculator.updateDisplay();
            break;
        // for addition and multiplication keys 
        case "+":
            calculator.addOperator("+");
            calculator.updateDisplay();
            break;
        case "*":
            calculator.addOperator("*");
            calculator.updateDisplay();
            break; 
        
        default:
            return;
    }
})
