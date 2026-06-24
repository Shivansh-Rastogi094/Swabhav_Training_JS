// 1. Game State Variables
let playerScore = 0;
let computerScore = 0;
let tieScore = 0;
let roundNumber = 0;

// 2. Constants for choices mapping to emojis
const choiceEmojis = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️'
};

// 3. Select DOM Elements
const playerScoreEl = document.getElementById('playerScore');
const tieScoreEl = document.getElementById('tieScore');
const computerScoreEl = document.getElementById('computerScore');

const playerChoiceDisplay = document.getElementById('playerChoiceDisplay');
const computerChoiceDisplay = document.getElementById('computerChoiceDisplay');
const resultBanner = document.getElementById('resultBanner');
const resultMessage = document.getElementById('resultMessage');

const rockBtn = document.getElementById('rockBtn');
const paperBtn = document.getElementById('paperBtn');
const scissorsBtn = document.getElementById('scissorsBtn');
const resetBtn = document.getElementById('resetBtn');

const logList = document.getElementById('logList');
const emptyLog = document.getElementById('emptyLog');

// 4. Initialize Game Event Listeners
function init() {
  rockBtn.addEventListener('click', () => playRound('rock'));
  paperBtn.addEventListener('click', () => playRound('paper'));
  scissorsBtn.addEventListener('click', () => playRound('scissors'));
  resetBtn.addEventListener('click', resetGame);
}

// 5. Generate Random Choice for the Computer
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  // Math.random() returns a decimal from 0 to 1
  // Multiplying it by 3 gives 0 to 2.99
  // Math.floor rounds down to the nearest whole number (0, 1, or 2)
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// 6. Main Round Execution Logic
function playRound(playerChoice) {
  roundNumber++;
  const computerChoice = getComputerChoice();

  // Update emojis displayed on screen
  playerChoiceDisplay.textContent = choiceEmojis[playerChoice];
  computerChoiceDisplay.textContent = choiceEmojis[computerChoice];

  // Compare choices to determine result
  let outcome = ''; // 'win', 'loss', or 'tie'
  
  if (playerChoice === computerChoice) {
    outcome = 'tie';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    outcome = 'win';
  } else {
    outcome = 'loss';
  }

  // Update scores and update screen
  updateScoreboard(outcome, playerChoice, computerChoice);
}

// 7. Update Scores & Result Message Banner
function updateScoreboard(outcome, playerChoice, computerChoice) {
  // Format choice names for display (e.g. "Rock", "Paper")
  const capPlayer = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);
  const capComputer = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);

  if (outcome === 'win') {
    playerScore++;
    playerScoreEl.textContent = playerScore;
    
    resultMessage.innerHTML = `<span class="win-text">YOU WIN!</span> ${capPlayer} beats ${capComputer}`;
  } else if (outcome === 'loss') {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    
    resultMessage.innerHTML = `<span class="loss-text">COMPUTER WINS!</span> ${capComputer} beats ${capPlayer}`;
  } else {
    tieScore++;
    tieScoreEl.textContent = tieScore;
    
    resultMessage.innerHTML = `<span class="tie-text">IT'S A TIE!</span> Both chose ${capPlayer}`;
  }

  // Add round details to log history
  addLogEntry(outcome, playerChoice, computerChoice);
}

// 8. Add Match History Entry
function addLogEntry(outcome, playerChoice, computerChoice) {
  // Hide the "no rounds played" placeholder, show the log list
  emptyLog.classList.add('hidden');
  logList.classList.remove('hidden');

  // Create new list element
  const li = document.createElement('li');
  li.className = 'log-item';

  // Format outcome styles
  let outcomeText = '';
  let outcomeClass = '';

  if (outcome === 'win') {
    outcomeText = 'Win';
    outcomeClass = 'log-win';
  } else if (outcome === 'loss') {
    outcomeText = 'Loss';
    outcomeClass = 'log-loss';
  } else {
    outcomeText = 'Tie';
    outcomeClass = 'log-tie';
  }

  // Set the text content of the list item
  li.innerHTML = `
    <span>Round ${roundNumber}: You chose <strong>${playerChoice}</strong>, Computer chose <strong>${computerChoice}</strong></span>
    <span class="log-result ${outcomeClass}">${outcomeText}</span>
  `;

  // Insert new entry at the top of the history list
  logList.insertBefore(li, logList.firstChild);
}

// 9. Reset Game State to Default
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  tieScore = 0;
  roundNumber = 0;

  // Reset scores text on HTML
  playerScoreEl.textContent = '0';
  computerScoreEl.textContent = '0';
  tieScoreEl.textContent = '0';

  // Reset display icons
  playerChoiceDisplay.textContent = '❓';
  computerChoiceDisplay.textContent = '❓';

  // Reset result text banner
  resultMessage.innerHTML = 'Make your choice to begin!';

  // Clear match history list
  logList.innerHTML = '';
  logList.classList.add('hidden');
  emptyLog.classList.remove('hidden');
}

// 10. Start listeners on page load
window.addEventListener('DOMContentLoaded', init);
