function roll(){

    const diceNum = Number(document.getElementById("diceNum").value);

    const diceResult = document.getElementById("diceResult");

    let values = [];

    for(let i = 0; i < diceNum; i++){

        let random = Math.floor(Math.random() * 6) + 1;

        values.push(random);

    }

    diceResult.textContent = values.join(" , ");

}