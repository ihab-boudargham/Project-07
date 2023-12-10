let numClick = -1; // mu,=mber of clicks on the colors
let userPattern = [];
let correctPattern = ["red", "blue", "yellow", "green"];
let level = 0;
let highScore = 0;
let compTurn; //boolean
let intervalId;
let noise = true;
let win;


const green = document.querySelector('#green');
const red = document.querySelector('#red');
const yellow = document.querySelector('#yellow');
const blue = document.querySelector('#blue');

function enterGame() {
    var username = document.getElementById('username').value;
    document.querySelector('.username p').textContent = username;
    document.querySelector('.start-screen').style.display = 'none';
    level.innerHTML = "- - -";
    // generateInactiveGameBoard();
    // clearInterval(intervalId);

}

function startGame() {

    updateGameMessage('Game Started! Follow the Pattern !');
    document.querySelector('.header button').style.display = 'none'; // to remove the Start button
}

    document.querySelector('.start').addEventListener('click', startGame);


function updateGameMessage(message) {
    document.querySelector('.game-message').innerHTML = message;
}

