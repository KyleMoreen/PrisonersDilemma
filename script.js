const pot = document.getElementById('pot');
const playerScore = document.getElementById('play-score');
const computerScore = document.getElementById('com-score');
const result = document.getElementById('result');
const hint = document.getElementById('hint');
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

        result.innerText = 'You took the money!';

        hint.innerText = 'The computer seems calm.';

        turn = 0;

        checkWin();

    } else {
        playCash = 0;
        playerScore.innerText = `Player: $${playCash.toLocaleString()}`;

        comCash = 0;
        computerScore.innerText = `Computer: $${comCash.toLocaleString()}`;

        result.innerText = 'You both tried to take the money and lost everything!';

        hint.innerText = 'The computer seems calm.';

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

        result.innerText = 'You both passed.';

    } else {
        comCash += cash;
        computerScore.innerText = `Computer: $${comCash.toLocaleString()}`;
    
        cash = 100;
        pot.innerText = `Pot: $${cash.toLocaleString()}`;

        result.innerText = 'The computer took the money!';

        hint.innerText = 'The computer seems calm.';

        turn = 0;

        checkWin();
    }
}

function comChoice() {
    turn++;
    const odds = Math.ceil(19 / turn) + 1;
    setHint(odds);
    const choice = Boolean(Math.floor(Math.random() * odds));
    return choice;
}

function setHint(odds) {
    if (odds > 10) {
        hint.innerText = 'The computer seems calm.';
    } 
    
    else if (odds > 5) {
        hint.innerText = 'The computer seems to be deep in thought.';
    } 
    
    else if (odds > 3) {
        hint.innerText = 'The computer seems a bit nervous.';
    }

    else {
        hint.innerText = 'The computer looks extremely anxious!';
    }
}

function checkWin() {
    if (playCash >= 1000000) {
        result.innerText = 'You win!'
        hint.innerText = 'The computer seems sad';
        disableButtons();

    } else if (comCash >= 1000000) {
        result.innerText = 'Computer wins.'
        hint.innerText = 'The computer seems pleased with itself.';
        disableButtons();
    } 
}

function disableButtons() {
    takeButton.disabled = true;
    passButton.disabled = true;
}