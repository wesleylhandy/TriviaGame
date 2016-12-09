//wait for window to load before allowing clicks

window.onload = function() {
	$("#choices").click(startQuiz);
}

//initialize variables
let gameStart = false,
	correctAnswer = false,
	timeUp = false,
	startTime = 30,
	gameOver = false,
	correct = 0,
	wrong = 0;

function reset() {
	gameStart = false,
	correctAnswer = false,
	timeUp = false,
	startTime = 30,
	gameOver = false,
	correct = 0,
	wrong = 0;
}

//question bank as an array of objects
//will allow randomization of questions

var questionBank = [
	{
		question: "'The Office' was set it what northeastern metropolis?",
		answers: ["Scranton, PA", "Binghampton, NY", "Lancaster, PA", "Pittsburg, PA" ],
		correctAnswer: 0,
		correctAnimation: "../images/dm-holiday-win.gif",
		wrongAnimation: "../images/kevin-stupidity-lose.gif"
	},

	{
		question: "What was the middle initial of Dunder Mifflin's maladroit manager - Michael Scott?",
		answers: ["K.", "A.", "J.", "S."],
		correctAnswer: 2,
		correctAnimation: "../images/mspc-win.gif",
		wrongAnimation: "../images/michael-explain-lose.gif"		
	},

	{
		question: "Which character was part of the show during season 1?",
		answers: ["Andy Bernard", "David Wallace", "Mose", "Toby Flenderson" ],
		correctAnswer: 3,
		correctAnimation: "../images/michael-right-win.gif",
		wrongAnimation: "../images/jim-goingon-lose.gif"
	},

	{
		question: "Which of the following characters was not a love interest of Michael?",
		answers: ["Karen Filipelli","Jan Levinson", "Holly Flax", "Donna"],
		correctAnswer: 0,
		correctAnimation: "../images/kevin-laugh-win.gif",
		wrongAnimation: "../images/jan-burn-lose.gif"
	},

	{
		question: "Pam and Roy dated for how many years before Pam called off their wedding?",
		answers: ["Seven Years", "Nine Years", "Three Years", "Five Years"],
		correctAnswer: 1,
		correctAnimation: "../images/pam-nice-win.gif",
		wrongAnimation: "../images/andy-hard-lose.gif"		
	},

	{
		question: "Which character won the Dundie for 'Hottest in the Office' every year but the last?",
		answers: ["Kelly Kapoor", "Ryan Howard", "Pam Beesly", "Erin Hannon"],
		correctAnswer: 1,
		correctAnimation: "../images/",
		wrongAnimation: "../images/ryan-notme-lose.gif"
	},

	{
		question: "Michael breaks up with Pamela's mom, Helene, on her birthday because..",
		answers: ["Michael thinks he has herpes", 
				"Michael thinks Jan is having his baby", 
				"Michael realizes Helene is 60 years old", 
				"Michael is two-timing with his realtor"],
		correctAnswer: 2,
		correctAnimation: "../images/dwight-true-win.gif",
		wrongAnimation: "../images/michael-inside-lose.gif"
	},

	{
		question: "Which famous people cameoed on the show to interview for manager after Michael left?",
		answers: ["Tom Hanks, Ray Romano, Sally Fields, James Spader",
				"Ray Romano, Roseanne Barr, Kathy Bates, Laurence Fishburne",
				"Will Arnett, Ray Romano, Jim Carrey, Warren Buffett",
				"Tina Fey, Jim Carrey, Bill Gates, James Spader" ],
		correctAnswer: 2,
		correctAnimation: "../images/jim-darrell-win.gif",
		wrongAnimation: "../images/kevin-chili-lose.gif"
	},

	{
		question: "Which regular on the show wrote the most episodes?",
		answers: ["Mindy Kaling (Kelly Kapoor)", 
				"Steve Carell (Michael Scott)", 
				"B.J. Novak (Ryan Howard)", 
				"Paul Lieberstein (Toby Flenderson)"],
		correctAnswer: 0,
		correctAnimation: "../images/angela-yes-win.gif",
		wrongAnimation: "../images/dwight-crying-lose.gif"
	},

	{
		question: "Which of the following did not direct at least one episode of 'The Office'?",
		answers: ["Steve Carell", "J. J. Abrams", "Jon Favreau", "Michael Bay"],
		correctAnswer: 3,
		correctAnimation: "../images/michael-running-win.gif",
		wrongAnimation: "../images/michael-no-lose.gif"
	}
];

//var gameAudio = new Audio ("../sounds/theme.mp3");

//functions needed for game to operate


// randomize questions and store them in a queue

// display questions, one at a time

// gameclock as a function with functions

// click function for answers

// display animation based on correct/incorrect answer

// click function for next question (possibly use setTimeout)

// display endgame scenario