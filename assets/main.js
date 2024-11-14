document.addEventListener('DOMContentLoaded', () => {
    // Elements for "How to Play" Sections
    var howToPlayButton1 = document.getElementById('how-to-play');
    var howToPlaySection = document.querySelector('.how-to-play-img');
    var closeButton = document.querySelector('.close');
    var howToPlayButton2 = document.getElementById('how-to-play2');
    var howToPlaySection2 = document.querySelector('.how-to-play-img2');
    var closeButton2 = document.querySelector('.close2');

    // Toggle visibility for How to Play sections
    if (howToPlayButton1 && howToPlaySection) {
        howToPlayButton1.addEventListener('click', () => {
            howToPlaySection.classList.toggle('hidden');
        });
    }
    if (closeButton && howToPlaySection) {
        closeButton.addEventListener('click', () => {
            howToPlaySection.classList.add('hidden');
        });
    }
    if (howToPlayButton2 && howToPlaySection2) {
        howToPlayButton2.addEventListener('click', () => {
            howToPlaySection2.classList.toggle('hidden');
        });
    }
    if (closeButton2 && howToPlaySection2) {
        closeButton2.addEventListener('click', () => {
            howToPlaySection2.classList.add('hidden');
        });
    }
    // Timer functionality
    var timeDisplay = document.getElementById('time-display');
    var timeOverSection = document.querySelector('.time-over');
    var pauseSection = document.querySelector('.pause');
    var pauseButton = document.getElementById('pause');
    var resumeButton = document.querySelector('.pause-btn');
    var time = 30; // Countdown 
    var timerInterval = null;

    // Format time in mm:ss format
    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 30);
        var remainingSeconds = seconds % 30;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // Start the timer
    function startTimer() {
        clearInterval(timerInterval); 
        timerInterval = setInterval(updateTimer, 1000); 
    }

    // Stop the timer
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Update the timer
    function updateTimer() {
        timeDisplay.textContent = formatTime(time);
        if (time <= 0) {
            stopTimer();
            timeOverSection.classList.remove('hidden'); 
        } else {
            time -= 1; 
        }
    }
    // Replay button 
    var replayButton = document.querySelector('.replay');
    if (replayButton) {
        replayButton.addEventListener('click', () => {
            timeOverSection.classList.add('hidden'); 
            resetGame(); 
        });
    }

    //  5 incorrect mistakes
    var backgroundImg = document.querySelector('.backround-img');
    var mistakesCountElement = document.getElementById('mistakes-count');
    var incorrectSection = document.querySelector('.five-incorrect');
    
    var mistakes = 0;

    // mistakes image clicks
    backgroundImg.addEventListener('click', () => {
        if (mistakes < 5) {
            mistakes += 1;
            mistakesCountElement.textContent = `${mistakes}/5`; 
            if (mistakes === 5) {
                stopTimer(); 
                incorrectSection.classList.remove('hidden'); 
            }
        }
    });

    // Replay button 
    var replayButton2 = document.querySelector('.replay2');
    if (replayButton2) {
        replayButton2.addEventListener('click', () => {
            mistakes = 0; 
            mistakesCountElement.textContent = '0/5'; 
            incorrectSection.classList.add('hidden'); 
            resetGame(); 
        });
    }

    // Pause 
    if (pauseButton) {
        pauseButton.addEventListener('click', () => {
            stopTimer(); 
            pauseSection.classList.remove('hidden'); 
        });
    }

    if (resumeButton) {
        resumeButton.addEventListener('click', () => {
            pauseSection.classList.add('hidden'); 
            startTimer(); 
        });
    }


    function resetGame() {
        time = 30;
        itemsFound = 0;
        mistakes = 0;
        timeDisplay.textContent = formatTime(time);
        mistakesCountElement.textContent = `${mistakes}/5`;
        itemsFoundCount.textContent = itemsFound;

        // Hide 
        wonSection.classList.add('hidden');
        timeOverSection.classList.add('hidden');
        incorrectSection.classList.add('hidden');
        items.forEach(item => {
            document.getElementById(item.buttonId).style.border = '';
            document.getElementById(item.elementId).style.border = '';
        });

       
        startTimer();
    }

    // Handle item found logic
    var itemsFoundCount = document.getElementById('items-found-count');
    var wonSection = document.querySelector('.won');
    var itemsFound = 0;
    var items = [
        { buttonId: 'inv-pot', elementId: 'pot' },
        { buttonId: 'inv-chicha', elementId: 'chicha' },
        { buttonId: 'inv-earing', elementId: 'earing' },
        { buttonId: 'inv-flower', elementId: 'flower' },
        { buttonId: 'inv-glasses', elementId: 'glasses' },
        { buttonId: 'inv-hat', elementId: 'hat' },
        { buttonId: 'inv-necklace', elementId: 'necklace' },
        { buttonId: 'inv-orange-carpet', elementId: 'orange-carpet' },
        { buttonId: 'inv-shoes1', elementId: 'shoes' },
        { buttonId: 'inv-shoes2', elementId: 'shoes' },
        { buttonId: 'inv-tea-cup', elementId: 'tea-cup' }
    ];

    // Add event listeners for all inventory buttons
    items.forEach(item => {
        var button = document.getElementById(item.buttonId);
        if (button) {
            button.addEventListener('click', () => {
                // For shoes item, 
                if (item.elementId === 'shoes') {
                    // Mark both the "shoes1" and "shoes2" buttons and image as found
                    document.getElementById('inv-shoes1').style.border = '2px solid green';
                    document.getElementById('inv-shoes2').style.border = '2px solid green';
                    document.getElementById('shoes').style.border = '2px solid green';
                } else {
                    // For all other items, just mark the clicked item
                    document.getElementById(item.buttonId).style.border = '2px solid green';
                    document.getElementById(item.elementId).style.border = '2px solid green';
                    itemsFound++;
                    itemsFoundCount.textContent = itemsFound;
                    if (itemsFound === 10) {
                        wonSection.classList.remove('hidden');
                    }
                }
            });
        }
    });

    // Add event listener for the restart button
    var restartButton = document.getElementById('restart');
    if (restartButton) {
        restartButton.addEventListener('click', resetGame); // Reset game when clicked
    }
    // Initialize the timer when the page loads
    startTimer();
});
document.addEventListener('DOMContentLoaded', () => {
   var quitButton = document.getElementById('quit');
    
    if (quitButton) {
        quitButton.addEventListener('click', () => {
            window.close(); // Attempt to close the browser window
        });
    }
});


