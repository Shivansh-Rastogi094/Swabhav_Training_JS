const btn = document.getElementById("btn");
const guessInput = document.getElementById("guessInput");
const message = document.getElementById("message");
const attempts = document.getElementById("attempts");

let randomNumber = Math.floor(Math.random() * 100) + 1;

let chances = 10;

btn.onclick = function () {

    let userGuess = Number(guessInput.value);

    chances--;

    attempts.textContent = chances;

    if (userGuess === randomNumber) {

        message.textContent = "🎉 Correct Guess!";

    }

    else if (userGuess < randomNumber) {

        message.textContent = "Too Low!";

    }

    else {

        message.textContent = "Too High!";

    }

    if (chances === 0 && userGuess !== randomNumber) {

        message.textContent = "Game Over! Number was " + randomNumber;

        btn.disabled = true;

    }

}

guessInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        btn.click();
    }

});