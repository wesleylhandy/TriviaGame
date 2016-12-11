//initialize variables
let gameStart = false,
	correctAnswer = false,
	timeUp = false,
	gameOver = false,
	correct = 0,
	wrong = 0,
	randomQs = [];

//wait for window to load before allowing clicks

window.onload = function() {

	randomizeQuestions();
	// click function for answers
	$(".choice").click(function() { 
		if (gameStart) {
			gameClock.stop();
			quiz.checkAnswer($(this).data("choice"));
		} else {
			quiz.gameOn();
		}
	});
	//shows after each question
	$("#next-button").click(quiz.gameOn);

	//only shows after all questions answered
	$("#replay-button").click(reset);
}

function reset() {
	gameStart = false,
	correctAnswer = false,
	timeUp = false,
	gameOver = false,
	quiz.qIndex = 10;
	correct = 0,
	wrong = 0,
	randomQs = [];
	randomizeQuestions();
	quiz.gameOn();
}

//question bank as an array of objects
//will allow randomization of questions

var questionBank = [
	{
		q: "'The Office' was set it what northeastern metropolis?",
		a: ["Scranton, PA", "Binghampton, NY", "Lancaster, PA", "Pittsburg, PA" ],
		aIndex: 0,
		correctAnimation: '<iframe src="http://giphy.com/embed/slsmTQGDFhAfC?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/5ouaUj87wIpP2?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	},

	{
		q: "What was the middle initial of Dunder Mifflin's maladroit manager - Michael Scott?",
		a: ["K.", "A.", "J.", "S."],
		aIndex: 2,
		correctAnimation: '<iframe src="http://giphy.com/embed/5wWf7GW1AzV6pF3MaVW?html5=true" width="100%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/5wWf7H89PisM6An8UAU?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'		
	},

	{
		q: "Which character was part of the show during season 1?",
		a: ["Andy Bernard", "David Wallace", "Mose", "Toby Flenderson" ],
		aIndex: 3,
		correctAnimation: '<iframe src="http://giphy.com/embed/12yZ3KEf43DfLG?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/DZnXGa85EDmJq?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	},

	{
		q: "Which of the following characters was not a love interest of Michael?",
		a: ["Karen Filipelli","Jan Levinson", "Holly Flax", "Donna"],
		aIndex: 0,
		correctAnimation: '<iframe src="http://giphy.com/embed/UvOtZlM2mpnZ6?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/ocU4BrDT5JTEI?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	},

	{
		q: "Pam and Roy dated for how many years before Pam called off their wedding?",
		a: ["Seven Years", "Nine Years", "Three Years", "Five Years"],
		aIndex: 1,
		correctAnimation: '<iframe src="http://giphy.com/embed/B5KV4cBwngJ8I?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/95c8VYQyrf6gg?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'		
	},

	{
		q: "Which character won the Dundie for 'Hottest in the Office' every year but the last?",
		a: ["Kelly Kapoor", "Ryan Howard", "Pam Beesly", "Erin Hannon"],
		aIndex: 1,
		correctAnimation: '<iframe src="http://giphy.com/embed/jo4vznLSCUVB6?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/jA4T01RxBv77W?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	},

	{
		q: "Michael breaks up with Pamela's mom, Helene, on her birthday because..",
		a: ["Michael thinks he has herpes", 
				"Michael thinks Jan is having his baby", 
				"Michael realizes Helene is 60 years old", 
				"Michael is two-timing with his realtor"],
		aIndex: 2,
		correctAnimation: '<iframe src="http://giphy.com/embed/Mhj339AjXjpCM?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/jfRGnN954yU7u?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	},

	{
		q: "Which famous people cameoed on the show to interview for manager after Michael left?",
		a: ["Tom Hanks, Ray Romano, Sally Fields, James Spader",
				"Ray Romano, Roseanne Barr, Kathy Bates, Laurence Fishburne",
				"Will Arnett, Ray Romano, Jim Carrey, Warren Buffett",
				"Tina Fey, Jim Carrey, Bill Gates, James Spader" ],
		aIndex: 2,
		correctAnimation: '<iframe src="http://giphy.com/embed/y5yzypjVc9u3S?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/wKXqWCButLQT6?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	},

	{
		q: "Which regular on the show wrote the most episodes?",
		a: ["Mindy Kaling (Kelly Kapoor)", 
				"Steve Carell (Michael Scott)", 
				"B.J. Novak (Ryan Howard)", 
				"Paul Lieberstein (Toby Flenderson)"],
		aIndex: 0,
		correctAnimation: '<iframe src="http://giphy.com/embed/12Ez4WVD11ko4o?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/Cz1it5S65QGuA?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	},

	{
		q: "Which of the following did not direct at least one episode of 'The Office'?",
		a: ["Steve Carell", "J. J. Abrams", "Jon Favreau", "Michael Bay"],
		aIndex: 3,
		correctAnimation: '<iframe src="http://giphy.com/embed/yoJC2i270b1mQvcDdK?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/6ZaYjk1qC1Tby?html5=true&hideSocial=true" width="100%"  frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	}
];

//var gameAudio = new Audio ("assets/sounds/theme.mp3");

//functions needed for game to operate


// randomize questions and store them

function randomizeQuestions() {
	//make a copy of questionBank, so that qbank is unaltered
	var possibleQs = questionBank.slice(0);
	for ( let i = 0; i < questionBank.length; i++) {
		//get a random question
		var randomIndex = Math.floor(Math.random() * possibleQs.length);
		var question = possibleQs[randomIndex];
		//push to selected
		randomQs.push(question);
		//remove from copied questions
		possibleQs.splice(randomIndex, 1);
	}
}

// gameclock as a function with functions
var gameClock = {

	time : 30,

	reset: function() {
		gameClock.time = 30;
		$("#timer").text(gameClock.timeConverter(gameClock.time));
	},

	start: function() {
	    round = setInterval(gameClock.countdown, 1000);
  	},

  	stop: function() {
     	clearInterval(round);
  	},

	countdown: function() {
		if (gameClock.time === 0) {
       		timeUp = true;
       		gameClock.stop();
       		quiz.checkAnswer(-1);
       	} else {
			gameClock.time--;
			let currentTime = gameClock.timeConverter(gameClock.time);
	       	$("#timer").text(currentTime);
		}
	},

	timeConverter: function(t) {
	    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
	    var minutes = Math.floor(t / 60);
	    var seconds = t - (minutes * 60);
	    // allows game time to be altered in the future to more than one minute
	    if (seconds < 10) {
	      seconds = "0" + seconds;
	    }

	    if (minutes === 0) {
	      minutes = "00";
	    }

	    else if (minutes < 10) {
	      minutes = "0" + minutes;
	    }

	    return minutes + ":" + seconds;
  	}
}

var quiz = {

	qIndex: 10,

	gameOn : function() {
		// display endgame scenario if no more questions
		if (quiz.qIndex === 0) {

			quiz.gameOver();

		} else {
			//hide results and end-game and display quiz
			$("#result-screen").css("display", "none");
			$("#next-button").css("display", "none");
			$("#end-screen").css("display", "none");
			$("#question-screen").css("display", "inherit");

			gameStart = true; //flag .choice click function to stay in quiz
			gameClock.reset(); //reset clock to 30 sec
			$("#timer").css("display", "inherit"); //display clock
			gameClock.start(); //start gameClock
			quiz.getQuestion(); 
		}
	},
	// display questions, one at a time
	getQuestion: function() {
		
		quiz.qIndex--;
		//update display
		$("#question").text(randomQs[quiz.qIndex].q);
		$("#0").text(randomQs[quiz.qIndex].a[0]);
		$("#1").text(randomQs[quiz.qIndex].a[1]);
		$("#2").text(randomQs[quiz.qIndex].a[2]);
		$("#3").text(randomQs[quiz.qIndex].a[3]);
	},
	// display animation based on correct/incorrect answer
	checkAnswer: function(data) {

		if (parseInt(data) === randomQs[quiz.qIndex].aIndex) {
			correctAnswer = true;
			correct++;
			$("#result-gif").html(randomQs[quiz.aIndex].correctAnimation);
			$("#result-text").html("Correct! Way to go 'Big Tuna!'");
		} else {
			correctAnswer = false;
			wrong++;
			$("#result-gif").html(randomQs[quiz.aIndex].wrongAnimation);
			$("#result-text").html("Incorrect, Plop! The right answer was:<br>"
				+ randomQs[quiz.qIndex].a
				[randomQs[quiz.qIndex].aIndex]);
		}
		$("#question-screen").css("display", "none");
		$("#result-screen").css("display", "inherit");
		setTimeout(function(){ $("#next-button").css("display", "inherit");}, 2000);
	},

	gameOver: function() {	
		//hide results and show end-game scenario		
		$("#result-screen").css("display", "none");
		$("#next-button").css("display", "none");
		$("#end-screen").css("display", "inherit");

		$("#correct").text(correct);
		$("#incorrect").text(wrong);
		$("#percentage").text(Math.round((correct/10)*100) + "%");
		setTimeout(function(){ $("#replay-button").css("display", "inherit");}, 2000);



	}

}