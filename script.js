//set elements inside variables for later use
const easyButton = document.getElementById('easy');
const medButton = document.getElementById('medium');
const hardButton = document.getElementById('hard');

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

let winNum = 10000;
let turnCap = 3;

easyButton.style.filter = 'opacity(100%)';

//initialize booleans to check if the money was taken last turn or not
let playerTook = false;
let comTook = false;

//add initial cash values to screen
pot.innerText = `Pot: $${cash.toLocaleString()}`;
playerScore.innerText = `Player: $${playCash.toLocaleString()}`;
computerScore.innerText = `Computer: $${comCash.toLocaleString()}`;

//reset game to default values
function resetGame() {
    cash = 100;
    playCash = 0;
    comCash = 0;

    turn = 0;
    odds = 19;

    playerTook = false;
    comTook = false;

    enableTake();
    enablePass();

    pot.innerText = `Pot: $${cash.toLocaleString()}`;
    playerScore.innerText = `Player: $${playCash.toLocaleString()}`;
    computerScore.innerText = `Computer: $${comCash.toLocaleString()}`;

    result.innerText = 'Will you take the money or pass?'
    hint.innerText = 'The computer seems calm.'
}

//set difficulty of game based on button press
function setDifficulty(obj) {
    resetColor();
    obj.style.filter = 'opacity(100%)';
    winNum = obj.getAttribute('data-win');
    turnCap = obj.getAttribute('data-turncap')
    resetGame();
}

//reset difficulty button colors when game difficulty is changed
function resetColor() {
    easyButton.style.filter = 'opacity(50%)';
    medButton.style.filter = 'opacity(50%)';
    hardButton.style.filter = 'opacity(50%)';
}

//when take money button is pressed
function takeMoney() {

    //decide whether com will pass or not
    let comPass;

    if (comTook) {
        comPass = true;
    }

    else {
        comPass = comChoice();
    }

    //if player takes money and com passes
    if (comPass) {

        if (comTook) {
            comTook = false;
        }

        playCash += cash;
        playerScore.innerText = `Player: $${playCash.toLocaleString()}`;

        result.innerText = 'You took the money!';

        playerTook = true;

        setTurn();
        setOdds();
        checkWin();
    } 
    
    //if player and com both take money
    else {
        playCash = 0;
        playerScore.innerText = `Player: $${playCash.toLocaleString()}`;

        comCash = 0;
        computerScore.innerText = `Computer: $${comCash.toLocaleString()}`;

        result.innerText = 'You both tried to take the money and lost everything!';
        
        playerTook = true;
        comTook = true;

        setTurn();
        setOdds();
    }

    disableTake();

    cash = 100;
    pot.innerText = `Pot: $${cash.toLocaleString()}`;
}

//when pass button is pressed
function pass() {

    //decide whether com will pass or not
    let comPass;

    if (comTook) {
        comPass = true;
    }

    else {
        comPass = comChoice();
    }

    //if player took last turn, reset value to false
    if (playerTook) {
        playerTook = false;
        enableTake();
    }

    //if player passes and com takes money
    if (!comPass) {
        comCash += cash;
        computerScore.innerText = `Computer: $${comCash.toLocaleString()}`;
    
        cash = 100;
        pot.innerText = `Pot: $${cash.toLocaleString()}`;

        result.innerText = 'The computer took the money!';

        comTook = true;

        setTurn();
        setOdds();
        checkWin();
    }

    //if both player and com pass
    else {

        if (comTook) {
            comTook = false;
        }

        cash = cash * 2;
        pot.innerText = `Pot: $${cash.toLocaleString()}`;

        result.innerText = 'You both passed.';

        setTurn();
        setOdds();
    } 
}

function disableTake() {
    takeButton.disabled = true;
    takeButton.style.backgroundColor = 'grey';
}

function enableTake() {
    takeButton.disabled = false;
    takeButton.style.backgroundColor = 'green';
}

function disablePass() {
    passButton.disabled = true;
    passButton.style.backgroundColor = 'grey';
}

function enablePass() {
    passButton.disabled = false;
    passButton.style.backgroundColor = 'red';
}

//set odds for computer choice
function setOdds() {
    if (comTook) {
        hint.innerText = "You can't tell what the computer is thinking.";
    }

    else {
        const randNum = Math.floor(Math.random() * 10);

        //set odds based on turn and random number
        if (turn < turnCap) {
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

        else if (turn < (turnCap * 2)) {
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
}

function setTurn() {
    if (!playerTook && !comTook) {
        turn++;
    }

    else {
        turn = 0
    }
}

//determine com choice
function comChoice() {
    const choice = Boolean(Math.floor(Math.random() * odds));
    return choice;
}

//check if someone has won yet
function checkWin() {
    if (playCash >= winNum) {
        result.innerText = 'You win!'
        hint.innerText = 'The computer seems sad.';
        disableTake();
        disablePass();
    } 
    
    else if (comCash >= winNum) {
        result.innerText = 'Computer wins.'
        hint.innerText = 'The computer seems pleased with itself.';
        disableTake();
        disablePass();
    } 
}