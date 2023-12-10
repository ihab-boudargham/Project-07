let numClick = -1; // number of clicks on the screen it will keep track on what color are you on the screen. so if we press one click its red , 2 is blue ...
let userPattern = [];
let correctPattern = [];
let possibleColors = ["green", "red", "yellow", "blue"];
let level = 0;
let highScore = 0;

// to check everything we are doing is working
$(document).keydown(function(){
    if (level <= 0) {
        // give the next sequence of colors
        nextSequence();

    }
    // alert("Key is pressed");
});

    // creat correctPattern array and assign the audio to each color
    function nextSequence () {
        let rand = Math.floor(Math.random() * 4);
        let color = possibleColors[rand];
        // alert(color);
        correctPattern.push(color);
        playAudio(color);
        clickAnnimation("#" + color);
    }

    function playAudio(color) {
        let relPath = `sounds/${color}.mp3`;
        let audio = new Audio(relPath);
        audio.play();
    }


    function clickAnnimation(id) {
        // we can increase the time or derease it
        $(id).fadeOut(100).fadeIn(100);
    }

// beacuse im using tailwinds i must include the ready function
$(document).ready(function() {
    $(".buttons").click(function(buttonClicked) {
        numClick++;
        let color = buttonClicked.target.id; // this will return the id which is the color to the color variable.
        alert(color);
    });
});
    
    








































// const green = document.querySelector('#green');
// const red = document.querySelector('#red');
// const yellow = document.querySelector('#yellow');
// const blue = document.querySelector('#blue');

// function enterGame() {
//     var username = document.getElementById('username').value;
//     document.querySelector('.username p').textContent = username;
//     document.querySelector('.start-screen').style.display = 'none';
//     level.innerHTML = "- - -";
//     // generateInactiveGameBoard();
//     // clearInterval(intervalId);

// }

// function startGame() {

//     updateGameMessage('Game Started! Follow the Pattern !');
//     document.querySelector('.header button').style.display = 'none'; // to remove the Start button
// }

//     document.querySelector('.start').addEventListener('click', startGame());


// function updateGameMessage(message) {
//     document.querySelector('.game-message').innerHTML = message;
// }

