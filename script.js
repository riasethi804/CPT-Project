let posX = 0;
let posY = 0;
const boardWidth = 5;
const boardHeight = 5;
const stepSize = 50;
const brains = []; // Array to store brain images and positions

// Add event listener for the DOMContentLoaded to initialize page
document.addEventListener('DOMContentLoaded', function() 
{
  // Triggered when the start game button is clicked
  let startButton = document.getElementById('startButton');
  if (startButton) 
  {
    startButton.addEventListener('click', clicked);
  }
  else 
  {
    scatterBrains(10);
  }

  // Set up character image movement on game page
  appendCharacterImage();
  document.addEventListener('keydown', moveCharacter);
  scatterBrains();
});

function clicked()
{
  let selectedLevel = document.querySelector('input[name="level"]:checked');
  let selectedCharacter = document.querySelector('input[name="character"]:checked');

  if (!selectedLevel || !selectedCharacter)
  // if the user does not select a game & a character before starting
  {
    alert("Please select both a difficulty level and a character before starting the game.");
    return;
  }

  let levelValue = selectedLevel.value;
  let characterImageSrc = selectedCharacter.nextElementSibling.src;

  window.location.href = `${levelValue}Page.html?character=${encodeURIComponent(characterImageSrc)}`;
  /* JS statement that changes the current page's URL to a new one
     window.location.href means the current URL of the browser window 
     ${levelValue}Page.html - ${levelValue} means a variable or value representing the level
     ?character=${encodeURIComponent(characterImageSrc)} is a query string appended to the URL
      - question mark followed by key-value pairs
  */
}

function appendCharacterImage()
{
  let params = new URLSearchParams(window.location.search); /* extracts the character 
  value from URL */
  let characterImageSrc = params.get('character');
  if (characterImageSrc)
  {
    let characterImage = document.createElement('img');
    characterImage.src = characterImageSrc;
    characterImage.alt = 'Selected Character';
    characterImage.id = 'character'; // This adds an ID to the character image 
    let container = document.getElementById('right-container'); /* used to structure
    content in EasyPage.html and HardPage.html */
    if (container)
    {
      container.appendChild(characterImage); /*  the newly created characterImage is 
      appended to this container using container.appendChild(characterImage) */
      adjustCharacterInitialPosition(); /* set the initial position of the character
       image within the container */
    }
  }
}

function adjustCharacterInitialPosition()
{
  // Get the character element by its ID
  const character = document.getElementById('character');
  if (character)  // Check if the character element exists
  {
    character.style.position = 'absolute';
    character.style.left = '0px'; // Set the initial left position to 0 pixels
    character.style.top = '0px';
  }
}

function scatterBrains(numBrains) {
  const brains = [];
  const brainWidth = 50;  // Adjust to match the width of your brain images
  const brainHeight = 62; // Adjust to match the height of your brain images
  const offsetX = 100;    // Minimum distance from the left of the screen
  const offsetY = 100;    // Minimum distance from the top of the screen

  for (let i = 0; i < numBrains;) {
    const brain = document.createElement('img');
    brain.src = 'brain.png';
    brain.className = 'brain';
    brain.style.position = 'absolute';

    // Random position within window bounds with an offset
    const x = Math.random() * (window.innerWidth - brainWidth - offsetX) + offsetX;
    const y = Math.random() * (window.innerHeight - brainHeight - offsetY) + offsetY;

    brain.style.left = `${x}px`;
    brain.style.top = `${y}px`;

    // Check if the new brain overlaps with existing brains
    let overlap = brains.some(otherBrain => {
      const otherRect = otherBrain.getBoundingClientRect();
      const newRect = brain.getBoundingClientRect();
      return !(
        newRect.right < otherRect.left ||
        newRect.left > otherRect.right ||
        newRect.bottom < otherRect.top ||
        newRect.top > otherRect.bottom
      );
    });

    // If no overlap detected, append the brain to the body and save it
    if (!overlap) {
      document.body.appendChild(brain);
      brains.push(brain);
      i++; // Only increment if the brain has been placed successfully
    }
  }
}


function moveCharacter(event) 
{
  // If the character image exists on the page, this function is applied 
  const character = document.getElementById('character');

  if (character) 
  {
    switch (event.key) /* This is how many pixels at a time the user can move their 
     key at in a specified direction */
    {
      case 'ArrowUp':
        posY -= 20;
        break;
      case 'ArrowDown':
        posY += 20;
        break;
      case 'ArrowLeft':
        posX -= 20;
        break;
      case 'ArrowRight':
        posX += 20;
        break;
    }

    // Update the top / left style of character to show the new position:
    character.style.top = `${posY}px`;
    character.style.left = `${posX}px`;
  }
}
// Modifications to script.js

// Helper function to generate a random addition question
function getRandomAdditionQuestion() {
  const num1 = Math.floor(Math.random() * 90) + 10;  // Ensure two-digit number
  const num2 = Math.floor(Math.random() * 90) + 10;  // Ensure two-digit number
  const correctAnswer = num1 + num2;
  return {
    question: `What is ${num1} + ${num2}?`,
    answer: correctAnswer
  };
}

function checkBrainCollision() {
  const character = document.getElementById('character');
  const characterRect = character.getBoundingClientRect();
  const brains = document.querySelectorAll('.brain');

  brains.forEach(brain => {
    const brainRect = brain.getBoundingClientRect();
    const brainBottomCenterX = brainRect.left + brainRect.width / 2;
    const brainBottomCenterY = brainRect.top + (brainRect.height * 3) / 4; // Adjust accordingly

    if (
      characterRect.left < brainBottomCenterX &&
      characterRect.right > brainBottomCenterX &&
      characterRect.top < brainBottomCenterY &&
      characterRect.bottom > brainBottomCenterY
    ) {
      if (!brain.classList.contains('answered')) {
        // The brain is not marked as answered, so we ask the question
        const { question, answer } = getRandomAdditionQuestion();
        const userAnswer = parseInt(prompt(question), 10);
        if (userAnswer === answer) {
          alert('Correct!');
          brain.classList.add('answered'); // Marking the brain as 'answered'
          brain.remove(); // Removing the brain element from the page
        } else {
          alert(`Incorrect. The correct answer is ${answer}.`);
        }
      }
    }
  });
}

function getRandomAdditionQuestion() {
  const num1 = Math.floor(Math.random() * 90) + 10; // Ensure two-digit number
  const num2 = Math.floor(Math.random() * 90) + 10; // Ensure two-digit number
  return {
    question: `What is ${num1} + ${num2}?`,
    answer: num1 + num2
  };
}

document.addEventListener('keydown', (event) => {
  moveCharacter(event);
  checkBrainCollision(); // Check collision after each move
});




