var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

function nextSequence() {
  userClickedPattern=[];

  level++;
  $("h1").html("level " + level);

  var rnum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[rnum];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playsound(randomChosenColour);
}

$(".btn").on("click", function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playsound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function playsound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).toggleClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).toggleClass("pressed");
  }, 100);
}

$(document).on("keydown", function () {
  if (!started) {
    $("h1").html("level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playsound("wrong");
    $("body").toggleClass("game-over");
    setTimeout(() => {
        $("body").toggleClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");

    startover();
  }
}

function startover(){
    level=0;
    gamePattern=[];
    started=false;
}
