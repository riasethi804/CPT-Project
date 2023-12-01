document.addEventListener('DOMContentLoaded', function() 
{
  let startButton = document.getElementById('startButton');
  startButton.addEventListener('click', clicked);
});

function clicked() 
{
  let selectedLevel = document.querySelector('input[name="level"]:checked');
  let selectedCharacter = document.querySelector('input[name="character"]:checked');
  if (!selectedLevel || !selectedCharacter) 
  {
    alert("Please select both a difficulty level and a character before starting the game.");
    return;  
  }
 
  let levelValue = selectedLevel.value;
  if (levelValue == "Easy") 
  {
    window.location.href = "EasyPage.html";
  }
  
  else if (levelValue == "Hard") 
  {
    window.location.href = "HardPage.html";
  }
}