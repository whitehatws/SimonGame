var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
gamePattern = [];
userClickPattern = [];



$('.btn').click(function(){
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);

    var sound = new Audio('/sounds/'+userChosenColor+'.mp3');
    sound.play();
    $("#"+userChosenColor).fadeOut(100).fadeIn(100);

    checkAnswer(userClickPattern.length-1);
});

    // Checks if most recent user click matches the last gamePatter choice
    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
            if (userClickPattern.length === gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                }, 1000)
            }
        } else {
            var gameOverSound = new Audio('/sounds/wrong.mp3');
            gameOverSound.play();
            $("body").addClass("game-over"); 
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 2000);
            $("h1").text("GAME OVER! Press any key to reset.")
            $(document).one("keypress", function(){
                startOver();
            });

        };
    };

// Main function
function nextSequence(){
    userClickPattern = [];
    randomNumber = Math.floor(Math.random() *4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var sound = new Audio('/sounds/'+randomChosenColor+'.mp3');
    sound.play();
    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100);
    level++;
    $("h1").text("Level "+level);

}


// Starts game first key press only
$(document).one("keypress", function(){
    nextSequence();
    $("h1").text("Level "+level);
});

function startOver(){
    gamePattern = [];
    level = 0;
    $("h1").text("Press Any Key to Start");
    $(document).one("keypress", function(){
        nextSequence();
        $("h1").text("Level "+level);
    });
};