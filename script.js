var level = 0;
var stepPattern = 0;
var gamePattern = [];
var gameStart = false;

$(document).keypress(function(event) {
	if (event.key == "a" && !gameStart) {
		$("h1").text("Level " + level);
		initPattern();
	}
});

function initPattern() {
	setTimeout(function() {
		createPattern(level);
		setTimeout(function() {
			gameStart = true;
		}, 500 * level);
	}, 500);
}

function createPattern(currentRep) {
	var randomIndex = Math.floor(Math.random() * 4);
	var currentColor = $("button").eq(randomIndex).attr("class")

	gamePattern.push(currentColor);
	playSound(currentColor);
	$("button").eq(randomIndex).fadeIn(100).fadeOut(100).fadeIn(100);

	setTimeout(function() {
		if (currentRep > 0) {
			currentRep -= 1;
			createPattern(currentRep);
		}
	}, 400);
}

$("button").click(function() {
	if (gameStart) {
		var className = $(this).attr("class");
		animatedPress($(this));
		playSound(className);
		checkStep(className);
	}
})

function animatedPress(btn) {
	btn.addClass("pressed");
	setTimeout(function() {
		btn.removeClass("pressed");
	}, 200);
}

function nextLevel() {
	$("h1").text("Level " + level);
	resetGame();
	initPattern();
}

function checkStep(className) {
	if (className !== gamePattern[stepPattern])
		startOver()
	else {
		stepPattern += 1;
		setTimeout(function() {
			if (stepPattern > level) {
				level += 1;
				nextLevel();
			}
		}, 1000);
	}
}

function resetGame() {
	gameStart = false;
	gamePattern = [];
	stepPattern = 0;
}

function startOver() {
	$("h1").text("Press A Key to Start");
	$("body").addClass("game-over");
	setTimeout(function() {
		$("body").removeClass("game-over");
	}, 500);
	playSound("over");

	level = 0;
	resetGame();
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.volume = 0.2;
	audio.play();

  }