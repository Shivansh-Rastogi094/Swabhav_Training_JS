function generate(){

    const passwordLength = Number(document.getElementById("length").value);

    const includeUppercase = document.getElementById("uppercase").checked;

    const includeLowercase = document.getElementById("lowercase").checked;

    const includeNumbers = document.getElementById("numbers").checked;

    const includeSymbols = document.getElementById("symbols").checked;

    const result = document.getElementById("result");

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const numberChars = '0123456789';

    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let allowedChars = '';

    let password = '';

    allowedChars += includeLowercase ? lowercaseChars : '';

    allowedChars += includeUppercase ? uppercaseChars : '';

    allowedChars += includeNumbers ? numberChars : '';

    allowedChars += includeSymbols ? symbolChars : '';

    if(passwordLength <= 0){

        result.textContent = "Password length must be greater than 0";

        return;
    }

    if(allowedChars.length === 0){

        result.textContent = "Select at least one option";

        return;
    }

    for(let i = 0; i < passwordLength; i++){

        const randomIndex = Math.floor(Math.random() * allowedChars.length);

        password += allowedChars[randomIndex];
    }

    result.textContent = password;
}