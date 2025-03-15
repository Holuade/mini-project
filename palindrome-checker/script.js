    const inputElement = document.getElementById("text-input");
    const checkButton = document.getElementById("check-btn");
    const resultElement = document.getElementById("result");

    checkButton.addEventListener("click", () => {
    const inputText = inputElement.value;

    if (!inputText.trim()) {
        alert("Please input a value");
        return;
    }

    const isPalindrome = checkPalindrome(inputText);

    if (isPalindrome) {
        resultElement.textContent = `${inputText} is a palindrome`;
    } else {
        resultElement.textContent = `${inputText} is not a palindrome`;
    }

    resultElement.classList.remove("hidden");
    });

    function checkPalindrome(text) {
    const normalizedText = text.toLowerCase().replace(/[^a-z0-9]/g, "");

    const reversedText = normalizedText.split("").reverse().join("");

    return normalizedText === reversedText;
    }
