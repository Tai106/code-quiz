(function(){
 //Start quiz
 function buildQuiz(){
     //variable to store the HTML output 
     const output = [];

     // questions
     myQuestions.forEach(
         (currentQuestion, questionNumber)
         => {

        // store possible answers to question
        const answers= [];

        // for each available answer 

        for(letter in currentQuestion.answers){
            answers.push(
            '<label> <input type="radio" name="question${questionNumber}" value="${letter}"> ${letter} : ${currentQuestion.answers[letter]}</label>'
            );
        }

        // add question and answers to output
        output.push( '<div class="slide"> <div class="question"> ${currentQuestion.question.question} </div> <div class="answers"> ${answers,join("")} </div> </div>'
        );
      }
     );

     quizContainer.innerHTML = output.join('');
    }

    function showResult(){

        //answer containers from the quiz
        const answerContainers = quizContainer.querySelectorAll('.answers'
        );

        // keep track of user's answers
        let numCorrect = 0;

        // for each question
        myQuestion.forEach(
            (currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainer[questionNumber]; const selector = 'input[name=question${questionNumber}]:checked';
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
    resultContainer.innerHTML ='${numCorrect} out of ${myQuestions.lenght}';
}

function showSlide(n) {

    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){previousButton.style.display = 'none';
}
else{
 previousButton.style.display = 'inline-black';
}
if(currentSlide === slides.lenght-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
}
else{
    nextButton,style.display = 'inline-block'; submitButton.style.display = 'none';
}
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
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
    submitbutton.addEventListner('click',showResult);

    previousButton.addEventListener("click", showPreviousSlide);

    nextButton.addEventListener("click", showNextSlide);
})();













            function getTimeRemaining(endtime) {
                const total = Date.parse(endtime) - Date.parse(new Date());
                const seconds = Math.floor((total / 1000) % 60);
                const minutes = Math.floor((total / 1000 / 60) % 60);
                const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
                
                
                return {
                  total,
                  hours,
                  minutes,
                  seconds
                };
              }
              
              function initializeClock(id, endtime) {
                const clock = document.getElementById(id);
                const hoursSpan = clock.querySelector('.hours');
                const minutesSpan = clock.querySelector('.minutes');
                const secondsSpan = clock.querySelector('.seconds');
              
                function updateClock() {
                  const t = getTimeRemaining(endtime);
              
                  hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                  minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                  secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
              
                  if (t.total <= 0) {
                    clearInterval(timeinterval);
                  }
                }
              
                updateClock();
                const timeinterval = setInterval(updateClock, 1000);
              }
              
              const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
              initializeClock('clockdiv', deadline);