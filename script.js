//set elements inside variables for later use
const pot = document.getElementById('pot');
const playerScore = document.getElementById('play-score');
const computerScore = document.getElementById('com-score');
const result = document.getElementById('result');
const hint = document.getElementById('hint');
const takeButton = document.getElementById('take-money');
const passButton = document.getElementById('pass');

//initialize variables
let cash = 100;
let playCash = 0;
let comCash = 0;

let turn = 0;
let odds = 19;

//add initial cash values to screen
pot.innerText = `Pot: $${cash.toLocaleString()}`;
playerScore.innerText = `Player: $${playCash.toLocaleString()}`;
computerScore.innerText = `Computer: $${comCash.toLocaleString()}`;

//when take money button is pressed
function takeMoney() {
    const comPass = comChoice();

    //if player takes money and com passes
    if (comPass) {
        playCash += cash;
        playerScore.innerText = `Player: $${playCash.toLocaleString()}`;

        result.innerText = 'You took the money!';

        turn = 0;

        checkWin();
    } 
    
    //if player and com both take money
    else {
        playCash = 0;
        playerScore.innerText = `Player: $${playCash.toLocaleString()}`;

        comCash = 0;
        computerScore.innerText = `Computer: $${comCash.toLocaleString()}`;

        result.innerText = 'You both tried to take the money and lost everything!';

        turn = 0;
    }

    cash = 100;
    pot.innerText = `Pot: $${cash.toLocaleString()}`;

    setOdds();
}

//when pass button is pressed
function pass() {
    const comPass = comChoice();

    //if both player and com pass
    if (comPass) {
        cash = cash * 2;
        pot.innerText = `Pot: $${cash.toLocaleString()}`;

        result.innerText = 'You both passed.';
    } 
    
    //if player passes and com takes money
    else {
        comCash += cash;
        computerScore.innerText = `Computer: $${comCash.toLocaleString()}`;
    
        cash = 100;
        pot.innerText = `Pot: $${cash.toLocaleString()}`;

        result.innerText = 'The computer took the money!';

        turn = 0;

        checkWin();
    }

    setOdds();
}

//set odds for computer choice
function setOdds() {
    turn++;
    const randNum = Math.floor(Math.random() * 10);

    //set odds based on turn and random number
    if (turn < 5) {
        if (randNum === 0) {
            odds = 2;
            hint.innerText = 'The computer looks extremely anxious!';
        }
        else if (randNum < 3) {
            odds = 5;
            hint.innerText = 'The computer seems a bit nervous.';
        }
        else {
            odds = 20;
            hint.innerText = 'The computer seems calm.';
        }
    }

    else if (turn < 10) {
        if (randNum < 2) {
            odds = 2;
            hint.innerText = 'The computer looks extremely anxious!';
        }
        else if (randNum < 7){
            odds = 5;
            hint.innerText = 'The computer seems a bit nervous.';
        }
        else {
            odds = 20;
            hint.innerText = 'The computer seems calm.';
        }
    }

    else {
        if (randNum === 0) {
            odds = 20;
            hint.innerText = 'The computer seems calm.';
        }
        else if (randNum < 3) {
            odds = 5;
            hint.innerText = 'The computer seems a bit nervous.';
        }
        else {
            odds = 2;
            hint.innerText = 'The computer looks extremely anxious!';
        }
    }
}

//determine com choice
function comChoice() {
    const choice = Boolean(Math.floor(Math.random() * odds));
    return choice;
}

//check if someone has won yet
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

//if a player wins, disable buttons
function disableButtons() {
    takeButton.disabled = true;
    passButton.disabled = true;
}