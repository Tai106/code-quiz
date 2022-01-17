function showResults(questions, quizContainer, resultsContainer){
     //variable to store the HTML output 
     const output = [];

     // questions
     myQuestions.forEach( (currentQuestion, questionNumber) => {

        // store possible answers to question
        const answers = [];

        // for each available answer 

        for(letter in currentQuestion.answers){
            
        answers.push(
            `<label> <input type="radio" name="question${questionNumber}" value="${letter}"> ${letter} : ${currentQuestion.answers[letter]}</label>`
            );
        }

        // add question and answers to output
        output.push( 
            `<div class="slide"> <div class="question"> ${currentQuestion.question.question} </div> <div class="answers"> ${answers,join("")} </div> </div>`
        );
      }
     );

     quizContainer.innerHTML = output.join('');
    }

        function showResults(){

        //answer containers from the quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question
        myQuestions.forEach( (currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainers[questionNumber]; const selector = 'input[name=question${questionNumber}]:checked';
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct then....
        if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color green if answer is correct 
        answerContainer[questionNumber].style.color = 'lightgreen';
        }

        // color is red if question is not answerd or wrong 
        else{

         answerContainer[questionNumber].style.color = 'red';
        }
    });

    // show the number of correct answer
    resultsContainer.innerHTML ='${numCorrect} out of ${myQuestions.lenght}';
}

    // variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitbutton = document.getElementById('submit');

const myQuestions = [
    {
        question: "Arrays in javaScript can be used to store?",
        answers: {
            a: "number and strings",
            b: "other arrays",
            c: "booleans",
            d: "all of the above"
        },
        correctAnswer: "d"
    },
    { 

        question: "Commonly used data types Do Not Include",
        answers: {
            a: "strings",
            b: "booleans",
            c: "alerts",
            d: "numbers"
        },
        correctAnswer: "c"
    },
    {

        question: "A very useful tool used during development and debugging for printing content to the debugger is",
        answers: {
            a: "javaScript",
            b: "termianl/bash",
            c: "for loops",
            d: "console.log"
        },
        correctAnswer: "d"
    },
];

// begin
buildQuiz();

// pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".Slide");
let currentSlide = 0;

// show the first slide
showSlide(currentSlide);

// Event listeners
    submitbutton.addEventListner('click',showResults);

    previousButton.addEventListener("click", showPreviousSlide);

    nextButton.addEventListener("click", showNextSlide);


function showSlide(n) {

    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){previousButton.style.display = 'none';
}
else{
 previousButton.style.display = 'inline-block';
}
if(currentSlide === slides.lenght-1){
    nextButton.style.display = 'none';
    submitbutton.style.display = 'inline-block';
}
else{
    nextButton,style.display = 'inline-block'; submitbutton.style.display = 'none';
}
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}


