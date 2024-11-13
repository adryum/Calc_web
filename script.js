let calcScreen = document.getElementById("calc-screen");
let historyElement = document.getElementById("history-data");
let history = localStorage.getItem("history") === null ? [] : JSON.parse(localStorage.getItem("history"));
let isCommaPlaced = false;

updateHistory();
// Button functionality
document.querySelectorAll(".button").forEach(element => {
    if ( // Skips over complexer buttons
        element.textContent === "." ||
        element.textContent === "AC" ||
        element.textContent === "="
    ) {
       return;
    }
    
    element.addEventListener('click', (e) => {

        // Allows another comma to be placed after these operations
        if (
            e.target.textContent === "*" ||
            e.target.textContent === "/" ||
            e.target.textContent === "+" ||
            e.target.textContent === "-"
        ) {
            // Adds spaces for operators
            calcScreen.innerHTML += ` ${e.target.textContent} `;
            isCommaPlaced = false;
        } else {
            calcScreen.innerHTML += e.target.textContent;
        }
    });
});
document.getElementById("dot").addEventListener("click", (e) => {
    if (!isCommaPlaced) { // Allows only one comma for one number
        calcScreen.innerHTML += e.target.textContent;
        isCommaPlaced = true;
    }
});
document.getElementById("AC").addEventListener("click", () => {
   calcScreen.innerHTML = "";
    // Allows another comma to be placed
    isCommaPlaced = false;
});
document.getElementById("equals").addEventListener("click", () => {
    // Calculate input:
    let result = calculate();
    // Saves input to history
    history.push(calcScreen.innerHTML + " = " + result);

    updateHistory();
    
    // Shows result on screen
    calcScreen.innerHTML = result;
    // Makes it so there cant be a comma placed to the result
    isCommaPlaced = true;
});

function calculate() {
    return eval(calcScreen.innerHTML);
}

function clearHistory() {
    history = [];
    updateHistory();
}

function updateHistory() {
    // Clears element html
    historyElement.innerHTML = "";
    // Adds actual html data
    history.forEach(item => {
        historyElement.insertAdjacentHTML('afterbegin', `
            <div class="history-entry">
                ${item}
                <button class="delete-history-entry-button" type="button" onclick="clearHistoryEntry(${history.indexOf(item)})">Delete</button>
            </div>
       `);
    });
    console.log(history);
    localStorage.setItem("history", JSON.stringify(history));
}

function clearHistoryEntry(id) {
    // Deletes specified history entry
    console.log(id);
    history.splice(id, 1);
    updateHistory();
}