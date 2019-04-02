$(document).ready(function() {
  // Create a function that creates the start button and initial screen

    function openingPage() {
        openScreen =
        "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $("#mainArea").append(openScreen);
    }
    openingPage();
    //on-click event for start button to begin name



    $("#mainArea").on("click", ".start-button", function(event) {  
        generateQuestions();
        timerWrapper();
    }); // Closes start-button click



    $("body").on("click", ".answer", function(event) {
        selectedAnswer = $(this).text();
        //ternary operator, if/else replacement
        selectedAnswer === correctAnswers[questionCounter]
        ? //alert("correct");
            (clearInterval(theClock), generateWin())
        : //else
            //alert("wrong answer!");
            (clearInterval(theClock), generateLoss());
    }); // Close .answer click



    $("body").on("click", ".reset-button", function(event) {
        clickSound.play();
        resetGame();
    }); // Closes reset-button click
}); 

function timeoutLoss() {
  unansweredTally++;
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center'>You ran out of time!  The correct answer was: " +
    correctAnswers[questionCounter] +
    "</p>" +
    "<img class='center-block img-wrong' src='trump.gif'>";
  $("#mainArea").html(gameHTML);
  setTimeout(wait, 3000); 
}

function generateWin() {
  correctTally++;
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center'>Correct! The answer is: " +
    correctAnswers[questionCounter] +
    "</p>" +
    imageArray[questionCounter];
  $("#mainArea").html(gameHTML);

  setTimeout(wait, 3000); //end generatewin
}

function generateLoss() {
  incorrectTally++;
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center'>Wrong! The correct answer is: " +
    correctAnswers[questionCounter] +
    "</p>" +
    "<img class='center-block img-wrong' src='trump.gif'>";
  $("#mainArea").html(gameHTML);
  setTimeout(wait, 5000);
}
//end generate loss

function generateQuestions() {
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>10</span></p><p class='text-center'>" +
    questionArray[questionCounter] +
    "</p><p class='first-answer answer'>A. " +
    answerArray[questionCounter][0] +
    "</p><p class='answer'>B. " +
    answerArray[questionCounter][1] +
    "</p><p class='answer'>C. " +
    answerArray[questionCounter][2] +
    "</p><p class='answer'>D. " +
    answerArray[questionCounter][3] +
    "</p>";
  $("#mainArea").html(gameHTML);
} //end generate question

function wait() {
  //ternary operator replacing if/else for generate more questions
  questionCounter < 7
    ? (questionCounter++, generateQuestions(), (counter = 7), timerWrapper())
    : finalScreen();
} //end function

function timerWrapper() {
  theClock = setInterval(tenSeconds, 1000);
  function tenSeconds() {
    if (counter === 0) {
      clearInterval(theClock);
      timeoutLoss();
    }
    if (counter > 0) {
      counter--;
    }
    $(".timer").html(counter);
  }
}

function finalScreen() {
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center'>All done, here's how you did!" +
    "</p>" +
    "<p class='summary-correct'>Correct Answers: " +
    correctTally +
    "</p>" +
    "<p>Wrong Answers: " +
    incorrectTally +
    "</p>" +
    "<p>Unanswered: " +
    unansweredTally +
    "</p>" +
    "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $("#mainArea").html(gameHTML);
}

function resetGame() {
  questionCounter = 0;
  correctTally = 0;
  incorrectTally = 0;
  unansweredTally = 0;
  counter = 6;
  generateQuestions();
  timerWrapper();
}

var openScreen;
var gameHTML;
var counter = 6;
var questionArray = [
  "Which team knocked out Real Madrid in 2008?",
  "David Beckham left Real Madrid to sign up with which football club?",
  "Before “la Decima” in 2014, when was the last time Real Madrid won the Champions League?",
  "Before Cristiano Ronaldo, who was Real Madrid’s all time top scorer",
  "Before Mourinho, who was Real Madrid’s manager?",
  "Who was Santiago Bernabeu?",
  "How many “Copas del Rey” has Real Madrid won?"
];

var answerArray = [
  ["Roma", "AC Milan", "Bayern Munich", "Liverpool"],
  ["Manchester United", "LA Galaxy", "AC Milan", "Barcelona"],
  ["1999", "2001", "2002", "2005"],
  ["Di Stefano", "Santillana", "Butragueño", "Raul"],
  ["Manuel Pellegrini", "Rafa Benitez", "Fabio Capello", "Your mom"],
  ["Ex Manager","Ex Player","Ex Club Director","The first investor in the club"],
  ["15", "17", "19", "20"]
];

var imageArray = new Array();
imageArray[0] = "<img class='center-block' src='meme.gif'>";
imageArray[1] = "<img class='center-block' src='meme1.jpg'>";
imageArray[2] = "<img class='center-block' src='meme2.jpg'>";
imageArray[3] = "<img class='center-block' src='meme3.jpg'>";
imageArray[4] = "<img class='center-block' src='meme4.jpg'>";
imageArray[5] = "<img class='center-block' src='meme5.jpg'>";
imageArray[6] = "<img class='center-block' src='meme6.gif'>";

var correctAnswers = [
  "A. Roma",
  "B. LA Galaxy",
  "C. 2002",
  "D. Raul",
  "A. Manuel Pellegrini",
  "B. Ex Player",
  "C. 19"
];

var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sounds/click-sound.mp3");
