var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var gamePattern = [];
var started = false;

//*Start function
$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

//*When clicked on a button
$(".btn").click(function () {
    if (!started) return; // Ignore clicks if the game hasn't started
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // Check answer after user has clicked
    checkAnswer(userClickedPattern.length - 1);
  });

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = []; //emptying user pattern again //! Nhi toh stack hone lge ga ek pe ek
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);
}


//* Play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//*Animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  //* for delay in removing the class
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 70);
}
//*Checking Answers
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 1000);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
  }
}
function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  started = false; //to make the game start again

}
