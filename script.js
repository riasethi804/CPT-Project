document.addEventListener('DOMContentLoaded', function() 
{
  let startButton = document.getElementById('startButton');
  startButton.addEventListener('click', clicked);
  // Function to handle the click event on the start button
});

function clicked() 
{
  let selectedLevel = document.querySelector('input[name="level"]:checked');
  // Get the selected character from the radio buttons
  let selectedCharacter = document.querySelector('input[name="character"]:checked');
  if (!selectedLevel || !selectedCharacter) 
  {
    alert("Please select both a difficulty level and a character before starting the game.");
    return;
  }
  // Retrieve the value of the selected level
  let levelValue = selectedLevel.value;
  let characterImageSrc = selectedCharacter.nextElementSibling.src;
  
  window.location.href = `${levelValue}Page.html?character=${encodeURIComponent(characterImageSrc)}`;
}

function appendCharacterImage()
{
 // Retrieve the character image source from the query parameters of the URL
  let params = new URLSearchParams(window.location.search);
  let characterImageSrc = params.get('character');
  if (characterImageSrc) 
  {
    let characterImage = document.createElement('img');
  // Set the image source to the one obtained from the URL query 
    characterImage.src = characterImageSrc;
    characterImage.alt = 'Selected Character';
    let container = document.getElementById('right-container');
  // Append the new image element to the container
    container.appendChild(characterImage);
  }
}
document.addEventListener('DOMContentLoaded', appendCharacterImage);
// Function to append the selected character image to the page
