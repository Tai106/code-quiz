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