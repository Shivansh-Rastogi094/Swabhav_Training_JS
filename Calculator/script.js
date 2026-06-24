const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// Button Click Events
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        switch (value) {
            case "C":
                display.value = "";
                break;

            case "⌫":
                display.value = display.value.slice(0, -1);
                break;

            case "=":
                calculate();
                break;

            default:
                display.value += value;
        }
    });
});

// Calculate Function
function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

// Keyboard Support
document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Numbers and operators
    if (
        (key >= "0" && key <= "9") ||
        ["+", "-", "*", "/", ".", "%"].includes(key)
    ) {
        display.value += key;
    }

    // Enter
    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    // Backspace
    else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }

    // Escape = Clear
    else if (key === "Escape") {
        display.value = "";
    }
});