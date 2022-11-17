const images = document.querySelectorAll('img#game-images');

const introContainer = document.getElementById('intro-container');
const gameContainer = document.getElementById('main-game-container');
const scoreContainer = document.getElementById('score-container');

const nameInput = document.getElementById('name-input');
const plagBtn = document.getElementById('play-button');

const playerNameTag = document.getElementById('player-name');
playerNameTag.style.textDecoration = 'underline';

const h3PlayersChoice = document.getElementById('player-choice');
const h3PlayerScore = document.getElementById('player-score');

const computerNameTag = document.getElementById('computer-name');
computerNameTag.style.textDecoration = 'underline';
const h3ComputersChoice = document.getElementById('computer-choice');
const h3ComputerScore = document.getElementById('computer-score');

let playerPoints = 0;
let computerPoints = 0;

hideGame();

plagBtn.addEventListener('click', play = e => {
    e.preventDefault();
    showGame();
});


//Adds an eventlistener to all the images
for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('click', playGame = e => {
        let playersChoice = e.target.alt;
        let computersChoice = randomizeComputersChoice();

        let playerName = nameInput.value;
        if(playerName.trim() === ''){
            playerName = 'Player';
        }

        evalAnswer(playersChoice, computersChoice);

        playerNameTag.innerText = playerName;
        computerNameTag.innerText = 'Computer';
        h3PlayersChoice.innerText = `Picked: ${playersChoice}`;
        h3ComputersChoice.innerText = `Picked: ${computersChoice}`;
        h3PlayerScore.innerText = `Score: ${playerPoints}`;
        h3ComputerScore.innerText = `Score: ${computerPoints}`;

        if (playerPoints == 3) {
            displayWinner(playerName);

        }
        else if (computerPoints == 3) {
            displayWinner();
        }
    });
}


//Function to randomize the computers selected answer
function randomizeComputersChoice() {
    const choices = ['rock', 'paper', 'scissor'];
    const random = Math.round(Math.random() * 2);
    const computersChoice = choices[random];

    return computersChoice;
}

//Game logic
const choices = ['rock', 'paper', 'scissor'];
const beatsChoices = ['paper', 'scissor', 'rock'];

function evalAnswer(playersChoice, computersChoice) {
    for (let i = 0; i < choices.length; i++) {
        if (playersChoice === choices[i]) {
            let playersAnswer = choices[i];

            if (computersChoice === beatsChoices[i]) {
                console.log('COMPUTER WINS!');
                computerPoints++;
            }
            else if (computersChoice === playersAnswer) {
                console.log('ITS A DRAW!');
            }
            else {
                console.log('PLAYER WINS!');
                playerPoints++;
            }
        }
    }
    return playerPoints, computerPoints;
}

function displayWinner(name = 'Computer') {
    introContainer.style.display = 'none';
    for(let i = 0; i < images.length; i++){
        images[i].style.display = 'none';
    }

    const winnerContainer = document.createElement('div');
    document.body.appendChild(winnerContainer);
    winnerContainer.className = 'winner-container';

    const winnerText = document.createElement('h1');
    winnerText.innerText = `${name} won!`;
    winnerContainer.appendChild(winnerText);

    const playAgainBtn = document.createElement('button');
    playAgainBtn.innerText = 'Play again'
    winnerContainer.appendChild(playAgainBtn);

    playAgainBtn.addEventListener('click', resetGame = () => {
        winnerContainer.remove();
        for(let i = 0; i < images.length; i++){
            images[i].style.display = 'block';
        }
        reset();
    });

    const changeNameBtn = document.createElement('button');
    changeNameBtn.innerText = 'Change name';
    winnerContainer.appendChild(changeNameBtn);

    changeNameBtn.addEventListener('click', changeName = () => {
        introContainer.style.display = 'block';
        gameContainer.style.display = 'none';

        winnerContainer.remove();
        reset();
    });
}

function hideGame() {
    gameContainer.style.display = 'none';
    introContainer.style.display = 'block';
}

function showGame() {
    for(let i = 0; i < images.length; i++){
        images[i].style.display = 'block';
    }
    gameContainer.style.display = 'block';
    introContainer.style.display = 'none';
    playerNameTag.innerText = '';
    computerNameTag.innerText = '';
}

function reset() {
    playerPoints = 0;
    computerPoints = 0;

    h3PlayersChoice.innerText = ``;
    h3ComputersChoice.innerText = ``;
    h3PlayerScore.innerText = ``;
    h3ComputerScore.innerText = ``;
}