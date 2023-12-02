let posX = 0;
let posY = 0;
const boardWidth = 5;
const boardHeight = 5;
const stepSize = 50;

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
  // if user does not select a game & a character before starting
  {
    alert("Please select both a difficulty level and a character before starting the game.");
    return;
  }

  let levelValue = selectedLevel.value;
  let characterImageSrc = selectedCharacter.nextElementSibling.src;

  window.location.href = `${levelValue}Page.html?character=${encodeURIComponent(characterImageSrc)}`;
  /* JS statement that changes the current page's URL to a new one
     window.location.href means current URL of browser window 
     ${levelValue}Page.html - ${levelValue} means variable or value representing the level
     ?character=${encodeURIComponent(characterImageSrc)} is a query string appeneded to the URL
      - question mark followed by key value pairs
  encodeURIComponent(characterImageSrc) encodes special characters in characterImageSrc
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
    characterImage.id = 'character';// This adds an ID to the character image 
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

// Function to scatter brain images randomly across the body of the HTML document
function scatterBrains(numBrains) 
{
  for (let i = 0; i < numBrains; i++)    
  // Loop to create and position a specified number of brain images
  {
    const brain = document.createElement('img');
    brain.src = 'brain.png';
    brain.className = 'brain';
     // CSS class for styling purposes
    const x = Math.random() * (window.innerWidth - 50);
    // Generate random x and y coordinates within the window boundaries
    const y = Math.random() * (window.innerHeight - 50);
    brain.style.left = `${x}px`;
    brain.style.top = `${y}px`;
    document.body.appendChild(brain);  // Append the brain image to the body of the HTML document
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