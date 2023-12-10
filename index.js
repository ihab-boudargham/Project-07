let numClick = -1; // number of clicks on the screen it will keep track on what color are you on the screen. so if we press one click its red , 2 is blue ...
let userPattern = [];
let correctPattern = [];
let possibleColors = ["green", "red", "yellow", "blue"];
let level = 0;
let highScore = 0;

// to check everything we are doing is working
// $(document).keydown(function(){
//     if (level <= 0) {
//         // give the next sequence of colors
//         nextSequence();

//     }
//     // alert("Key is pressed");
// });

    // creat correctPattern array and assign the audio to each color
    function nextSequence () {
        level++;
        $("#level").text(level);
        let rand = Math.floor(Math.random() * 4);
        let color = possibleColors[rand];
        // alert(color);
        correctPattern.push(color);
        playAudio(color);
        clickAnnimation("#" + color);
    }

    function playAudio(color) {
        let relPath = color === 'lose' ? 'sounds/wrong.mp3' : `sounds/${color}.mp3`;
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
            // alert(color);

            clickAnnimation("#" + color);
            playAudio(color);

            checkAnswer(color);
        });
    });

    function checkAnswer(color) {
        userPattern.push(color);
        if (color == correctPattern[numClick]) {
            if (userPattern.length == correctPattern.length) {
                setTimeout(function () {
                    userPattern = [];
                    numClick = -1;
                    nextSequence(); // to level up
                }, 1000);
            }
        } else {
            // Play losing sound
            playAudio('lose');

            // Display a message and reset to level 0
            updateGameMessage("Wrong answer! Press Start to play again.");
            userPattern = [];
            correctPattern = [];
            level = 0;
            numClick = -1;
            document.querySelector('.header button').style.display = 'block'; // Show the Start button
        }
    }
    
    // when level = 0 it will get back to this function:
    // $(document).keydown(function(){
    //     if (level <= 0) {
    //         // give the next sequence of colors
    //         nextSequence();

    //     }
    //     // alert("Key is pressed");
    // });
    

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
    nextSequence(); // Uncomment this line to start the game
}

    document.querySelector('.start').addEventListener('click', startGame);


function updateGameMessage(message) {
    document.querySelector('.game-message').innerHTML = message;
}

