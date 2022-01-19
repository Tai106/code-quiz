function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

var sec = 25;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML = sec + "sec left";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Sorry time's up, please try again!! :(");
    }
}

Quiz.prototype.guess = function(answer) {
    if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};
var QuizUI = {
    displayNext: function () {
        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function() {
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;

        for(var i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i]);
        }
    },
    displayScore: function() {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2> Your score is: " + quiz.score + "</h2>";
        this.populateIdWithHTML("quiz", gameOverHTML);
    },
    
    populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    },
    
    displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
  }
};
// Questions
var questions = [
    new Question("Arrays in javaScript can be used to store?", ["Numbers & Strings", "Other Arrays", "Booleans","All of the above"], "All of the above"),
    new Question("Commonly used data types Do Not Include?", ["Strings", "Alerts", "Booleans","Numbers"], "Alerts"),
    new Question("A very useful tool used during development and debugging for printing content to the debugger is?", ["javaSript", "Terminal/bash", "For loops","console.log"], "console.log"),
    new Question("String values must be enclosed within ___ when being assigned to variables?", ["Commas", "Curly brackets", "Quotes","Parenthesis"], "Curly brackets"),
    new Question("What is javaSript?", ["Paper", "Colors", "css","Programming language"], "Programming language")
];

// Create Quiz
var quiz = new Quiz(questions);

// Display Quiz
QuizUI.displayNext();