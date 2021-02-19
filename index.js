var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var flag = 0;
var level;

//
$(".Start_button").click(function(event) {
  $(".Start_button").hide();

  $(".Play_Again_button").css("visibility", "visible");
  if (flag == 0) {
    level = 0;
    nextSequence();
  }
  flag = 1;;
});

$(".btn").click(function(event) {
  var userChosenColour = this.id;

  userClickedPattern.push(userChosenColour);

  makeSound(userChosenColour);
  animate(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(".Play_Again_button").click(function(event) {
  location.reload();
})

// functions
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut().fadeIn();
  makeSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
}

function animate(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function makeSound(currentColor) {
  var makeSound = new Audio("sounds/" + currentColor + ".mp3");
  makeSound.play();
}


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    GameOver();
  }

}



function GameOver() {

  var makeSound = new Audio("sounds/wrong.mp3");
  makeSound.play();

  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);

  $("h1").text("GAME OVER");

}
