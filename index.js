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
                    if (level > 0) {
                        displayWinMessage();
                        setTimeout(function () {
                            nextSequence(); // Delay before starting the next level
                        }, 1000); // Adjust the delay time (in milliseconds)
                    } else {
                        nextSequence(); // Start the next level immediately if level is 0
                    }
                }, 500); // Adjust the delay time (in milliseconds)
            }
        } else {
            playAudio('lose');
            let gameMessage = document.querySelector('.game-message');
            gameMessage.style.color = 'red'; // Set the color to red for this instance
            updateGameMessage("Wrong answer! Press Start to play again.");
            userPattern = [];
            correctPattern = [];
            level = 0;
            numClick = -1;
            document.querySelector('.header button').style.display = 'block';
        }
        
    }
    
    function displayWinMessage() {
        let winMessage = document.createElement('div');
        winMessage.classList.add('win-message');
        winMessage.textContent = `You won Level ${level}!`;
        document.body.appendChild(winMessage);
        setTimeout(() => {
            document.body.removeChild(winMessage);
        }, 1000); // Adjust the delay time (in milliseconds)
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
    
        document.querySelector('.header button').style.color = 'darkgreen';
    
        document.querySelector('.start-screen').style.display = 'none';
        document.querySelector('.header button').style.display = 'block'; // Show the Start button
        document.getElementById('level').textContent = 'NA'; // Hide the level
    }
    
    function startGame() {
        updateGameMessage('Ready for the challenge? Follow the Pattern !');
        document.querySelector('.header button').style.display = 'none'; // Hide the Start button
        document.getElementById('level').style.display = 'block'; // Show the level
        let gameMessage = document.querySelector('.game-message');
        gameMessage.style.color = '';
        nextSequence();
        
    }
    
    document.querySelector('.start').addEventListener('click', startGame);
    
    function updateGameMessage(message) {
        document.querySelector('.game-message').innerHTML = message;
    }