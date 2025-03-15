const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultDiv = document.getElementById("results-div");


const regex = /^1?\s?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;


checkBtn.addEventListener("click", () => {

    const input = userInput.value.trim();
    if (input === "") {
        alert("Please provide a phone number");
    return;
    } 

    const result = document.createElement("p");
    if(regex.test(input)){
        result.textContent = `Valid US number: ${userInput.value}`;
        result.className = "valid";
    } else {
        result.textContent = `Invalid US number: ${userInput.value}`;
        result.className = "invalid";
    } 

    resultDiv.appendChild(result); 
    userInput.value = ""; 
});


clearBtn.addEventListener("click", () => {
    resultDiv.innerHTML = ""; 
});
