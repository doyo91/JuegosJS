
const game = () => {
    let pScore = 0;
    let cScore = 0;

    //Start the Game
    const startGame = () => {
        const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');

        playBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
        });
    };

    //Play Match
    const playMatch = () => {
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');
    

        hands.forEach(hand => {
            hand.addEventListener('animationend', function () {
                this.style.animation = "";
            });
        });

        //Computer Options
        const computerOptions = ['rock', 'paper', 'scissors'];

        options.forEach(option => {
            option.addEventListener('click', function() {
                //Computer Choice
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];
                
                setTimeout(() => {
                    //Here is where we call compare hands
                    compareHands(this.value, computerChoice);
                    //Update Images
                    playerHand.src = `img/${this.value}.png`;
                    computerHand.src = `img/${computerChoice}.png`;

                }, 2000);

                //Animation
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease"

            });
        });   
    };

    //Update Score
    const updateScore = () => {
        const playerScore = document.querySelector('.player-score p');
        const computerScore = document.querySelector('.computer-score p');
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };
    
    //Compare Choices
    const compareHands = (playerChoice, computerChoice) => {
        //Update Text
        const winner = document.querySelector('.winner');
        //Cheking for a tie
        if(playerChoice  === computerChoice){
            winner.textContent = 'EMPATE';
            return;
        }
        //Check for Rock
        if(playerChoice === 'rock'){
            if(computerChoice === 'scissors'){
                winner.textContent = 'Jugador gana!';
                pScore ++;
                updateScore();
                return;
            }else { //computerChoice = paper
                winner.textContent = 'CPU gana!';
                cScore ++;
                updateScore();
                return;
            }
        }
        //Check for Paper
        if(playerChoice === 'paper'){
            if(computerChoice === 'rock'){
                winner.textContent = 'Jugador gana!';
                pScore ++;
                updateScore();
                return;
            }else { //computerChoice = scissors
                winner.textContent = 'CPU gana!';
                cScore ++;
                updateScore();
                return;
            }
        }
        //Check for Scissors
        if(playerChoice === 'scissors'){
            if(computerChoice === 'paper'){
                winner.textContent = 'Jugador gana!';
                pScore ++;
                updateScore();
                return;
            }else { //computerChoice = rock
                winner.textContent = 'CPU gana!';
                cScore ++;
                updateScore();
                return;
            }
        }
    };
    //Is call all the inner function
    startGame();
    playMatch();
};

//Start the game function
game();