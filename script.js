const pot = document.getElementById('pot');
const playerScore = document.getElementById('play-score');
const computerScore = document.getElementById('com-score');
const message = document.getElementById('message');
const takeButton = document.getElementById('take-money');
const passButton = document.getElementById('pass');

let cash = 100;
let playCash = 0;
let comCash = 0;

let turn = 0;

pot.innerText = `Pot: $${cash.toLocaleString()}`;
playerScore.innerText = `Player: $${playCash.toLocaleString()}`;
computerScore.innerText = `Computer: $${comCash.toLocaleString()}`;

function takeMoney() {
    const comPass = comChoice();

    if (comPass) {
        playCash += cash;
        playerScore.innerText = `Player: $${playCash.toLocaleString()}`;

        message.innerText = 'You took the money!';

        turn = 0;

        checkWin();

    } else {
        playCash = 0;
        playerScore.innerText = `Player: $${playCash.toLocaleString()}`;

        comCash = 0;
        computerScore.innerText = `Computer: $${comCash.toLocaleString()}`;

        message.innerText = 'You both tried to take the money and lost everything!';

        turn = 0;
    }

    cash = 100;
    pot.innerText = `Pot: $${cash.toLocaleString()}`;
}

function pass() {
    const comPass = comChoice();

    if (comPass) {
        cash = cash * 2;
        pot.innerText = `Pot: $${cash.toLocaleString()}`;

        message.innerText = 'You both passed.';

    } else {
        comCash += cash;
        computerScore.innerText = `Computer: $${comCash.toLocaleString()}`;
    
        cash = 100;
        pot.innerText = `Pot: $${cash.toLocaleString()}`;

        message.innerText = 'The computer took the money!';

        turn = 0;

        checkWin();
    }
}

function comChoice() {
    turn++;
    const odds = Math.ceil(19 / turn) + 1;
    const choice = Boolean(Math.floor(Math.random() * odds));
    return choice;
}

function checkWin() {
    if (playCash >= 1000000) {
        message.innerText = 'You win!'
        disableButtons();

    } else if (comCash >= 1000000) {
        message.innerText = 'Computer wins.'
        disableButtons();
    } 
}

function disableButtons() {
    takeButton.disabled = true;
    passButton.disabled = true;
}