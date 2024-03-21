// Array of quiz questions and their respective answers
const questions= [
    {
        Question:"Which continent is home to the iconic landmark, the Taj Mahal? ",
        answers:[
            { text:"Asia" , correct:true },
            { text:"Africa" , correct:false },
            { text:"Europe" , correct:false },
            { text:"South America" , correct:false },
        ]
    },
    {
        Question:"Which continent is home to the world's largest desert, the Sahara?",
        answers:[
            { text:"South America" , correct:false },
            { text:"Africa" , correct:true },
            { text:"Australia" , correct:false},
            { text:"Europe" , correct:false },
        ]
    },
    {
        Question:"Machu Picchu, a UNESCO World Heritage site, is located in which country? ",
        answers:[
            { text:"Argentina" , correct:false },
            { text:"Colombia" , correct:false },
            { text:"Peru" , correct:true },
            { text:"Chile " , correct:false },
        ]
    },
    {
        Question:"The Great Barrier Reef, the world's largest coral reef system, is situated off the coast of which country? ",
        answers:[
            { text:"Australia" , correct:true },
            { text:"Brazil" , correct: false},
            { text:"India" , correct: false},
            { text:"Canada" , correct:false },
        ]
    },
    {
        Question:"The city of Istanbul is located in which two continents? ",
        answers:[
            { text:"Europe and Africa" , correct: false},
            { text:"Europe and Asia" , correct:true },
            { text:"Asia and Australia" , correct: false},
            { text:"Africa and Australia" , correct: false},
        ]
    },{
        Question:" Which city is known for its famous landmarks such as the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral?",
        answers:[
            { text:"London" , correct: false},
            { text:"Paris" , correct:true },
            { text:"Rome" , correct: false},
            { text:"Barcelona" , correct:false },
        ]
    },
    {
        Question:"Which continent is known for its diverse wildlife, including the 'Big Five' (lion, leopard, elephant, buffalo, rhinoceros)?",
        answers:[
            { text:"Europe" , correct: false},
            { text:"Asia" , correct: false},
            { text:"Africa" , correct:true },
            { text:" North America " , correct: false},
        ]
    },
    {
        Question:"The Amazon Rainforest, the largest tropical rainforest in the world, is primarily located in which continent?",
        answers:[
            { text:"South America" , correct:true },
            { text:"North America" , correct:false },
            { text:" Australia" , correct: false},
            { text:"Africa" , correct:false },
        ]
    },
    {
        Question:"Which city is famous for its canals, gondolas, and historic architecture, including St.Mark's Square?  ",
        answers:[
            { text:"Amsterdam" , correct:false },
            { text:"Venice" , correct:true },
            { text:"Bruges" , correct:false },
            { text:"Prague " , correct: false},
        ]
    },
    {
        Question:"The Inca Trail, a famous hiking route, leads to which ancient city? ",
        answers:[
            { text:"Chichen Itza" , correct:false },
            { text:"Petra" , correct:false },
            { text:"Machu Picchu" , correct:true },
            { text:"Stonehenge " , correct:false },

        ]
    }
];
// Get references to various elements in the HTML document
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("Answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score=0;
let timer;
let timeLeft = 30; // Set the initial time for the countdown (in seconds)
// Function to start and handle the timer
function startTimer() {
    timeLeft = 30; // Reset the timer to 30 seconds for each question
    const timerElement = document.getElementById('countdown');
    timerElement.textContent = timeLeft;
    // Timer interval to decrement the time remaining every second
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        const progressBar = document.getElementById('progress-bar');
        const progressBarWidth = (timeLeft / 30) * 100; // Calculate the progress bar width
        progressBar.innerHTML = `<span style="width: ${progressBarWidth}%;"></span>`;
        // Handle time's up
        if (timeLeft === 0) {
            clearInterval(timer);
            handleTimeUp();
        }
    }, 1000);
}

// Function to handle time's up event
function handleTimeUp() {
    // Disable all answer buttons to prevent further interactions
    const answerButtons = document.getElementsByClassName('btn');
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].disabled = true;
    }

    // Show a message to the user indicating that time's up
    const feedbackMessage = document.createElement('div');
    feedbackMessage.textContent = 'Time\'s up! Moving to the next question...';
    feedbackMessage.classList.add('feedback-timeup');
    document.getElementById('Answer-buttons').appendChild(feedbackMessage);

    // Automatically proceed to the next question after a short delay 
    setTimeout(() => {
        nextButton.click();
    }, 3000);
}
// Function to display the current question and its answer options
function showQuestion(){
    resetState();
    let currentQuestion =  questions [currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML =questionNo + ". " + currentQuestion.Question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if( answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        
    });
}
// Function to reset the state of the quiz interface
function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);     
    }

}
// Function to handle the user's answer selection
function selectAnswer(e){

    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display= "block";
    clearInterval(timer);

}
// Function to display the final score after the quiz ends
function showScore(){
    resetState();
    questionElement.innerHTML= `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Next";
    tryAgainButton.style.display = 'block';
    timerElement.style.display= 'none';
    quitButton.style.display= 'block';
    

    const progressBar = document.getElementById('progress-bar');// Hide the progress bar
    progressBar.style.display = "none";
}
// Function to handle the next button click event
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        startTimer();
    } else {
        showScore();
        clearInterval(timer); // Clear the timer interval at the end of the quiz
    }
}
// Event listener for the next button

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
      // Handle the end of the quiz (optional)  
    }
});
// Function to shuffle the order of the quiz questions (optional)
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}
// Get references to start button, try again button, and quit button
const startQuizDiv = document.getElementById('start-quiz');
const quizDiv = document.querySelector('.quiz');
const resultDiv = document.getElementById('result');
const resultMessageElement = document.getElementById('result-message');
const timerElement = document.getElementById('timer'); // Get the timer element

const startButton = document.getElementById('start-btn');
const tryAgainButton = document.getElementById('try-again-btn');
const quitButton = document.getElementById('quit-btn');

function startQuiz() {
    startQuizDiv.style.display = 'block';
    quizDiv.style.display = 'block';
    resultDiv.style.display = 'none';

    startButton.addEventListener('click', () => {
        startQuizDiv.style.display = 'none';
        resultDiv.style.display = 'block';
        tryAgainButton.style.display = 'none';
        quitButton.style.display= 'none';
        nextButton.style.display='none';
        startTimer();
        showQuestion();
    });

    tryAgainButton.addEventListener('click', () => {
        resultDiv.style.display = 'block';
        tryAgainButton.style.display = 'none';
        quitButton.style.display = 'none';
        timerElement.style.display ='block';
       
        currentQuestionIndex = 0;
        score = 0;
        shuffleQuestions();
        startTimer();
        showQuestion(); // Call showQuestion() to display the first question again
    });

    quitButton.addEventListener('click', () => {
        // Display a thank you message when the user quits the quiz
        resultDiv.style.display = 'block';
        timerElement.style.display ='none';
        tryAgainButton.style.display= 'none';
        quitButton.style.display = 'none';
        resultMessageElement.textContent = 'Thanks for joining the quiz!';
    });
}


// Call the shuffleQuestions function before starting the quiz (optional)
//shuffleQuestions();
startQuiz();


