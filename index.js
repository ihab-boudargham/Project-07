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
        $(".buttons").prop("disabled", true);
        $(".start").prop("disabled", true);
        $(".buttons .boxColor").hide();
    
        $(".buttons").removeClass("shrink");
    
        $(".buttons").click(function(buttonClicked) {
            if (level > 0) {
                numClick++;
                let color = buttonClicked.currentTarget.id;
    
                clickAnnimation("#" + color);
                playAudio(color);

                $(`#${color}`).addClass(`bg-${color}-600`);
                $("#" + color + " p").removeClass("text-white");
                $("#" + color).addClass("shrink");
                $("#" + color).one("transitionend", function() {
                    $(this).removeClass("shrink");
                    $("#" + color + " p").addClass("text-white");
                    // Add the new dark background color class

                    setTimeout(function () {
                        $(`#${color}`).removeClass(`bg-${color}-600`);
                    }, 250);
                    
                });

                checkAnswer(color);
            }
        });
    });

    // to do list . dont allow the user to enetr game unless he wrote a username



    function checkAnswer(color) {
        userPattern.push(color);
        if (color == correctPattern[numClick]) {
            if (userPattern.length == correctPattern.length) {
                setTimeout(function () {
                    $(".buttons").removeClass("shrink");
                    userPattern = [];
                    numClick = -1;
                    if (level > 0) {
                        displayWinMessage();
                        setTimeout(function () {
                            nextSequence();
                        }, 1000);
                    } else {
                        nextSequence();
                    }
                }, 500);
            }
        } else {
            playAudio('lose');
            let gameMessage = document.querySelector('.game-message');
            gameMessage.style.color = 'red';
            updateGameMessage("Wrong answer! Press Start to play again.");

            // Remove the "shrink" class after a short delay
            setTimeout(function () {
                $(".buttons").removeClass("shrink");
            }, 500);
    
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

        if (username.trim() === '') {
            // Display an error message or take appropriate action
            alert('Please enter a username before starting the game.');
            return;
        }
    
        document.querySelector('.header button').style.color = 'darkgreen';
    
        document.querySelector('.start-screen').style.display = 'none';
        document.querySelector('.header button').style.display = 'block'; // Show the Start button
        $(".start").prop("disabled",false);
        document.getElementById('level').textContent = 'NA'; // Hide the level
        $(".buttons .boxColor").show();
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