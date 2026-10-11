const questions = [
    {
        prompt: 'Which language gives a web page its structure?',
        choices: ['CSS', 'HTML', 'JavaScript', 'SQL'],
        answer: 1
    },
    {
        prompt: 'Which value represents either true or false?',
        choices: ['String', 'Number', 'Boolean', 'Array'],
        answer: 2
    },
    {
        prompt: 'Which method selects the first matching element?',
        choices: ['querySelector', 'createElement', 'addEventListener', 'textContent'],
        answer: 0
    },
    {
        prompt: 'Which event commonly runs when a button is pressed?',
        choices: ['load', 'change', 'click', 'submit'],
        answer: 2
    }
];

const quizView = document.querySelector('#quiz-view');
const resultsView = document.querySelector('#results-view');
const questionNumber = document.querySelector('#question-number');
const questionPrompt = document.querySelector('#question-prompt');
const answerOptions = document.querySelector('#answer-options');
const feedback = document.querySelector('#feedback');
const nextButton = document.querySelector('#next-button');
const finalScore = document.querySelector('#final-score');
const restartButton = document.querySelector('#restart-button');

let currentIndex = 0;
let score = 0;

function showQuestion() {
    const question = questions[currentIndex];

    questionNumber.textContent =
        `Question ${currentIndex + 1} of ${questions.length}`;

    questionPrompt.textContent = question.prompt;
    answerOptions.replaceChildren();
    feedback.textContent = '';
    nextButton.hidden = true;

    question.choices.forEach(function (choice, index) {
        const button = document.createElement('button');

        button.type = 'button';
        button.className = 'answer-btn';
        button.textContent = choice;

        button.addEventListener('click', function () {
            checkAnswer(index);
        });

        answerOptions.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const question = questions[currentIndex];
    const buttons = answerOptions.querySelectorAll('button');

    buttons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedIndex === question.answer) {
        feedback.textContent = 'Correct! Well done.';
        score++;
    } else {
        feedback.textContent = 'Not quite. The correct answer is ' +
            question.choices[question.answer] + '.';
    }

    nextButton.hidden = false;
}

nextButton.addEventListener('click', function () {
    currentIndex++;

    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizView.hidden = true;
    resultsView.hidden = false;
    finalScore.textContent = `Your score: ${score} out of ${questions.length}`;
}

restartButton.addEventListener('click', function () {
    currentIndex = 0;
    score = 0;

    resultsView.hidden = true;
    quizView.hidden = false;

    showQuestion();
});

showQuestion();
