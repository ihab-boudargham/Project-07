let numClick = -1; // number of clicks on the screen it will keep track on what color are you on the screen. so if we press one click its red , 2 is blue ...
let userPattern = [];
let correctPattern = [];
let possibleColors = ["green", "red", "yellow", "blue"];
let level = 0;
let timer; // Timer variable
let timeLimit = 10000; // Initial time limit in milliseconds
let timerInterval; // Timer interval variable

// to check everything we are doing is working
// $(document).keydown(function(){
//     if (level <= 0) {
//         // give the next sequence of colors
//         nextSequence();
//     }
//     // alert("Key is pressed");
// });

    // creat correctPattern array and assign the audio to each color
    function nextSequence() {
        level++;
        $("#level").text(level);
        let rand = Math.floor(Math.random() * 4);
        let color = possibleColors[rand];
        correctPattern.push(color);
        playAudio(color);
        clickAnnimation("#" + color);
    
        // Update the time limit based on the current level
        timeLimit = calculateTimeLimit(level);
    
        // Restart the timer with the updated time limit
        startTimer(timeLimit); // Pass the updated time limit to startTimer
    }

    function updateTimerDisplay() {
        const secondsRemaining = Math.max(0, Math.round(timeLimit / 1000)); // Ensure non-negative value
        document.getElementById('timer-display').textContent = secondsRemaining + 's';
    
        // Calculate the width of the timer bar based on the remaining time
        const percentRemaining = (timeLimit / calculateTimeLimit(level)) * 100;
        $('#timer-bar').css('width', percentRemaining + '%');
      }

    function calculateTimeLimit(level) {
        const initialTimeLimit = 2000; // Initial time limit in milliseconds (3 seconds)
        const increasePerLevel = 500; // Increase per level in milliseconds (0.5 seconds)
        const maximumTimeLimit = 15000; // Maximum time limit in milliseconds (10 seconds)
    
        // Calculate the new time limit based on the level
        const newTimeLimit = initialTimeLimit + (level - 1) * increasePerLevel;
    
        // Limit the time to the maximum
        return Math.min(newTimeLimit, maximumTimeLimit);
    }
    
    

    function startTimer(initialTimeLimit) {
        timeLimit = initialTimeLimit; // Reset time limit for each level
        updateTimerDisplay();
    
        // Clear any existing timer interval
        clearInterval(timerInterval);
    
        // Start the countdown timer
        timerInterval = setInterval(function () {
            timeLimit -= 1000; // Decrease time by 1 second
            updateTimerDisplay(); // Update the UI with the remaining time
    
            // Calculate the animation duration dynamically
            const animationDuration = (timeLimit / 1000) + 's';
            $('#timer-bar').css({
                'animation-duration': animationDuration,
                'transition': 'height ' + animationDuration + ' linear'
            });
    
            if (timeLimit <= 0) {
                resetGame(); // Call a function to handle timeout (user loses)
            }
        }, 1000);
    }

    function resetTimer() {
        // Reset the timer to the initial time limit
        clearInterval(timerInterval);
        timeLimit = calculateTimeLimit(level); // Use the calculated time limit for the level
        updateTimerDisplay(); // Update the timer display
    }
    

    function playAudio(color) {
        let relPath = color === 'lose' ? 'sounds/wrong.mp3' : `sounds/${color}.mp3`;
        let audio = new Audio(relPath);
        audio.play();
    }
    
    function resetGame() {
        correctPattern = [];
        clearInterval(timerInterval);
        updateTimerDisplay();
    
        // Reset the UI for a new game
        $(".buttons").prop("disabled", false);
        $(".start").prop("disabled", false);
        $(".buttons .boxColor").show();
        $(".buttons").removeClass("shrink text-white");
        updateGameMessage("You ran out of time. Press Start to play again.");
    
        playAudio('lose');
        $(".start").show();
    
        // Reset level and time limit
        level = 0;
        timeLimit = 2000; // Reset initial time limit to 2 seconds
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
        $("#timer-display").hide();
        $(".exit-button").hide();
    
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
                        resetTimer(); // Reset the timer before starting the next level
                        setTimeout(function () {
                            nextSequence();
                            startTimer(calculateTimeLimit(level));; // Start the timer for the next level
                        }, 1000);
                    } else {
                        nextSequence();
                        startTimer(calculateTimeLimit(level)); // Start the timer for the next level
                    }
                }, 500);
            }
        } else {
            playAudio('lose');
            let gameMessage = document.querySelector('.game-message');
            gameMessage.style.color = 'red';
    
            // Check if the user ran out of time
            if (timeLimit <= 0) {
                updateGameMessage("Game over! You ran out of time. Press Start to play again.");
            } else {
                updateGameMessage("Wrong answer! Press Start to play again.");
    
                // Remove the "shrink" class after a short delay
                setTimeout(function () {
                    $(".buttons").removeClass("shrink");
                }, 500);
            }
    
            // Reset the game state
            resetTimer();
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
        $(".exit-button").show();
        document.querySelector('.header button').style.color = 'darkgreen';
        
        document.querySelector('.start-screen').style.display = 'none';
        document.querySelector('.header button').style.display = 'block'; // Show the Start button
        $(".start").prop("disabled",false);
        document.getElementById('level').textContent = 'NA'; // Hide the level
        $(".buttons .boxColor").show();
    }
    
    function startGame() {
        resetGame();
        $(".exit-button").show();
        updateGameMessage('Ready for the challenge? Follow the Pattern !');
        document.querySelector('.header button').style.display = 'none'; // Hide the Start button
        document.getElementById('level').style.display = 'block'; // Show the level
        let gameMessage = document.querySelector('.game-message');
        gameMessage.style.color = '';
        $(`.start`).addClass("lighter-green");
        nextSequence();
    }
    
    
    function updateGameMessage(message) {
        document.querySelector('.game-message').innerHTML = message;
    }

    function exitGame() {
        resetGame();
    
        // Clear the username input field
        document.getElementById('username').value = "";

        // Clear the displayed username
        document.querySelector('.username p').textContent = "";

        // Hide the game elements and show the start screen
        showStartScreen();
    }
    
    // Function to show the start screen
    function showStartScreen() {
        $(".start-screen").show();
        $(".header button").hide();
        $(".buttons .boxColor").hide();
        $("#timer-display").hide();
        $("#timer-bar").hide();
        $("#level").hide();
        $(".start").show();
        $(".exit-button").hide();
    }