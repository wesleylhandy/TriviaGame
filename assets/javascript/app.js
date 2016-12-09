//initialize variables
let gameStart = false,
	correctAnswer = false,
	timeUp = false,
	gameOver = false,
	correct = 0,
	wrong = 0,
	selectedQuestions = [];

//wait for window to load before allowing clicks

window.onload = function() {

	randomizeQuestions();

	$(".choice").click(function() { 
		if (gameStart) {
			quiz.checkAnswer($(this).data("choice"));
		} else {
			quiz.gameOn();
		}
	});

	$("#next-button").click(quiz.gameOn);


}

function reset() {
	gameStart = false,
	correctAnswer = false,
	timeUp = false,
	gameOver = false,
	correct = 0,
	wrong = 0,
	selectedQuestions = [];
}

//question bank as an array of objects
//will allow randomization of questions

var questionBank = [
	{
		question: "'The Office' was set it what northeastern metropolis?",
		answers: ["Scranton, PA", "Binghampton, NY", "Lancaster, PA", "Pittsburg, PA" ],
		correctIndex: 0,
		correctAnimation: '<iframe src="http://giphy.com/embed/slsmTQGDFhAfC?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/5ouaUj87wIpP2?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	},

	{
		question: "What was the middle initial of Dunder Mifflin's maladroit manager - Michael Scott?",
		answers: ["K.", "A.", "J.", "S."],
		correctIndex: 2,
		correctAnimation: '<iframe src="http://giphy.com/embed/5wWf7GW1AzV6pF3MaVW?html5=true" width="100%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/5wWf7H89PisM6An8UAU?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'		
	},

	{
		question: "Which character was part of the show during season 1?",
		answers: ["Andy Bernard", "David Wallace", "Mose", "Toby Flenderson" ],
		correctIndex: 3,
		correctAnimation: '<iframe src="http://giphy.com/embed/12yZ3KEf43DfLG?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/DZnXGa85EDmJq?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	},

	{
		question: "Which of the following characters was not a love interest of Michael?",
		answers: ["Karen Filipelli","Jan Levinson", "Holly Flax", "Donna"],
		correctIndex: 0,
		correctAnimation: '<iframe src="http://giphy.com/embed/UvOtZlM2mpnZ6?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/ocU4BrDT5JTEI?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	},

	{
		question: "Pam and Roy dated for how many years before Pam called off their wedding?",
		answers: ["Seven Years", "Nine Years", "Three Years", "Five Years"],
		correctIndex: 1,
		correctAnimation: '<iframe src="http://giphy.com/embed/B5KV4cBwngJ8I?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/95c8VYQyrf6gg?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'		
	},

	{
		question: "Which character won the Dundie for 'Hottest in the Office' every year but the last?",
		answers: ["Kelly Kapoor", "Ryan Howard", "Pam Beesly", "Erin Hannon"],
		correctIndex: 1,
		correctAnimation: '<iframe src="http://giphy.com/embed/jo4vznLSCUVB6?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/jA4T01RxBv77W?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	},

	{
		question: "Michael breaks up with Pamela's mom, Helene, on her birthday because..",
		answers: ["Michael thinks he has herpes", 
				"Michael thinks Jan is having his baby", 
				"Michael realizes Helene is 60 years old", 
				"Michael is two-timing with his realtor"],
		correctIndex: 2,
		correctAnimation: '<iframe src="http://giphy.com/embed/Mhj339AjXjpCM?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/jfRGnN954yU7u?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	},

	{
		question: "Which famous people cameoed on the show to interview for manager after Michael left?",
		answers: ["Tom Hanks, Ray Romano, Sally Fields, James Spader",
				"Ray Romano, Roseanne Barr, Kathy Bates, Laurence Fishburne",
				"Will Arnett, Ray Romano, Jim Carrey, Warren Buffett",
				"Tina Fey, Jim Carrey, Bill Gates, James Spader" ],
		correctIndex: 2,
		correctAnimation: '<iframe src="http://giphy.com/embed/y5yzypjVc9u3S?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/wKXqWCButLQT6?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	},

	{
		question: "Which regular on the show wrote the most episodes?",
		answers: ["Mindy Kaling (Kelly Kapoor)", 
				"Steve Carell (Michael Scott)", 
				"B.J. Novak (Ryan Howard)", 
				"Paul Lieberstein (Toby Flenderson)"],
		correctIndex: 0,
		correctAnimation: '<iframe src="http://giphy.com/embed/12Ez4WVD11ko4o?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/Cz1it5S65QGuA?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	},

	{
		question: "Which of the following did not direct at least one episode of 'The Office'?",
		answers: ["Steve Carell", "J. J. Abrams", "Jon Favreau", "Michael Bay"],
		correctIndex: 3,
		correctAnimation: '<iframe src="http://giphy.com/embed/yoJC2i270b1mQvcDdK?html5=true&hideSocial=true" width="100%" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>',
		wrongAnimation: '<iframe src="http://giphy.com/embed/6ZaYjk1qC1Tby?html5=true&hideSocial=true" width="100%"  frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>'
	}
];

//var gameAudio = new Audio ("../sounds/theme.mp3");

//functions needed for game to operate


// randomize questions and store them

function randomizeQuestions() {
	//make a copy of questionBank, so that qbank is unaltered
	var possibleQuestions = questionBank.slice(0);
	for ( let i = 0; i < questionBank.length; i++) {
		//get a random question
		var randomIndex = Math.floor(Math.random() * possibleQuestions.length);
		var question = possibleQuestions[randomIndex];
		//push to selected
		selectedQuestions.push(question);
		//remove from copied questions
		possibleQuestions.splice(randomIndex, 1);
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

	questionIndex: 10,

	gameOn : function() {
		if (quiz.questionIndex === 0) {

		} else {
			$("#result-screen").css("display", "none");
			$("#next-button").css("display", "none");
			$("#end-screen").css("display", "none");
			$("#question-screen").css("display", "inherit");
			gameStart = true;
			gameClock.reset();
			gameClock.start();
			quiz.nextQuestion();
		}
	},

	nextQuestion: function() {
		
		quiz.questionIndex--;
		//update display
		$("#question").text(selectedQuestions[quiz.questionIndex].question);
		$("#0").text(selectedQuestions[quiz.questionIndex].answers[0]);
		$("#1").text(selectedQuestions[quiz.questionIndex].answers[1]);
		$("#2").text(selectedQuestions[quiz.questionIndex].answers[2]);
		$("#3").text(selectedQuestions[quiz.questionIndex].answers[3]);
	},

	checkAnswer: function(data) {
		if (parseInt(data) === selectedQuestions[quiz.questionIndex].correctIndex) {
			correctAnswer = true;
			correct++;
			$("#result-gif").html(selectedQuestions[quiz.questionIndex].correctAnimation);
			$("#result-text").html("Correct! Way to go 'Big Tuna!'");
		} else {
			correctAnswer = false;
			wrong++;
			$("#result-gif").html(selectedQuestions[quiz.questionIndex].wrongAnimation);
			$("#result-text").html("Incorrect, Plop! The right answer was:<br>"
				+ selectedQuestions[quiz.questionIndex].answers
				[selectedQuestions[quiz.questionIndex].correctIndex]);
		}
		$("#question-screen").css("display", "none");
		$("#result-screen").css("display", "inherit");
		setTimeout(function(){ $("#next-button").css("display", "inherit");}, 2000);
	}

}

// display questions, one at a time



// click function for answers

// display animation based on correct/incorrect answer

// click function for next question (possibly use setTimeout)

// display endgame scenario