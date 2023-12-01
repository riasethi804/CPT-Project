let posX = 0;
let posY = 0;
const boardWidth = 5;
const boardHeight = 5;
const stepSize = 50;

// Add event listener for the DOMContentLoaded to initialize the page appropriately
document.addEventListener('DOMContentLoaded', function ()
 {
  // Triggered when the start game button is clicked
  let startButton = document.getElementById('startButton');
  if (startButton) 
  {
    startButton.addEventListener('click', clicked);
  }

  // Set up character movement if on the game page
  appendCharacterImage();
  document.addEventListener('keydown', moveCharacter);
});

function clicked() {
  let selectedLevel = document.querySelector('input[name="level"]:checked');
  let selectedCharacter = document.querySelector('input[name="character"]:checked');
  
  if (!selectedLevel || !selectedCharacter) {
    alert("Please select both a difficulty level and a character before starting the game.");
    return;
  }
  
  let levelValue = selectedLevel.value;
  let characterImageSrc = selectedCharacter.nextElementSibling.src;

  window.location.href = `${levelValue}Page.html?character=${encodeURIComponent(characterImageSrc)}`;
}

function appendCharacterImage() {
  let params = new URLSearchParams(window.location.search);
  let characterImageSrc = params.get('character');
  if (characterImageSrc) {
    let characterImage = document.createElement('img');
    characterImage.src = characterImageSrc;
    characterImage.alt = 'Selected Character';
    characterImage.id = 'character'; // Add an ID to the character image for easy selection
    
    let container = document.getElementById('right-container');
    if (container) {
      container.appendChild(characterImage);
      adjustCharacterInitialPosition();
    }
  }
}

function adjustCharacterInitialPosition() {
  // Initial position for the character can be set here, after the image is appended
  const character = document.getElementById('character');
  if (character) {
    character.style.position = 'absolute';
    character.style.left = '0px';
    character.style.top = '0px';
  }
}

function moveCharacter(event) {
  // This handler will only be attached if the character image exists on the page
  const character = document.getElementById('character');
  
  if (character) {
    switch (event.key) {
      case 'ArrowUp':
        posY = Math.max(0, posY - stepSize);
        break;
      case 'ArrowDown':
        posY = Math.min((boardHeight - 1) * stepSize, posY + stepSize);
        break;
      case 'ArrowLeft':
        posX = Math.max(0, posX - stepSize);
        break;
      case 'ArrowRight':
        posX = Math.min((boardWidth - 1) * stepSize, posX + stepSize);
        break;
    }
  
    character.style.top = `${posY}px`;
    character.style.left = `${posX}px`;
  }
}