var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    level++;
    $("h1").text("Level " + level);

    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(3);
    var randomNumber = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    if(gamePattern.length - 1 === userClickedPattern.length - 1){
        checkAnswer(userClickedPattern.length - 1);
    }
    
});

function checkAnswer(currentLevel){
    console.log(gamePattern);
    console.log(userClickedPattern);
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        setTimeout(() => {
            nextSequence();
        },1000);
        userClickedPattern = [];
    }
    else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart!");

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
      },100);
}

$(".popup-btn").click(function(){
    $(".popup").fadeOut(400);
});  