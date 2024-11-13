let history = [];
let calcScreen = document.getElementById("calc-screen");
// Button functionality
document.querySelectorAll(".button").forEach(element => {
    if ( // Skips over complexer buttons
        element.textContent === "AC" ||
        element.textContent === "="
    ) {
       return;
    }
    
    element.addEventListener('click', (e) => {
        calcScreen.innerHTML += e.target.textContent;
    });
});
document.getElementById("AC").addEventListener("click", (e) => {
   calcScreen.innerHTML = ""; 
});
document.getElementById("equals").addEventListener("click", (e) => {
    // Calculate input:
    let result = calculate();
    // Saves input to history
    history.push(calcScreen.innerHTML + " = " + result);
    
    // Shows result on screen
    calcScreen.innerHTML = result;
});

function calculate() {
    return eval(calcScreen.innerHTML);
}

function clearHistory() {}