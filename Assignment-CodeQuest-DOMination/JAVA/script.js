const questions = [
  {
    question: "Who played Batman in the 1989 film 'Batman'?",
    answers: [
      { text: "Michael Keaton", correct: true },
      { text: "Val Kilmer", correct: false },
      { text: "George Clooney", correct: false },
      { text: "Christian Bale", correct: false },
    ],
  },
  {
    question: "In 'The Dark Knight', which actor played the Joker?",
    answers: [
      { text: "Jared Leto", correct: false },
      { text: "Heath Ledger", correct: true },
      { text: "Jack Nicholson", correct: false },
      { text: "Mark Hamill", correct: false },
    ],
  },
  {
    question: "What is the name of Batman’s butler?",
    answers: [
      { text: "Jarvis", correct: false },
      { text: "Alfred Pennyworth", correct: true },
      { text: "Lucius Fox", correct: false },
      { text: "James Gordon", correct: false },
    ],
  },
  {
    question:
      "In 'Batman Begins', who trained Bruce Wayne in the League of Shadows?",
    answers: [
      { text: "Ra's al Ghul", correct: true },
      { text: "Bane", correct: false },
      { text: "The Joker", correct: false },
      { text: "Two-Face", correct: false },
    ],
  },
  {
    question:
      "Which Batman movie features the villain Bane breaking Batman’s back?",
    answers: [
      { text: "Batman & Robin", correct: false },
      { text: "The Dark Knight Rises", correct: true },
      { text: "Batman Forever", correct: false },
      { text: "Batman v Superman", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizSection = document.getElementById("quiz-section");
const scoreSection = document.getElementById("score-section");
const scoreText = document.getElementById("score-text");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  quizSection.classList.remove("hidden");
  scoreSection.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  if (correct) score++;

  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
    button.disabled = true; // lock answers
  });

  nextButton.classList.remove("hidden");
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  quizSection.classList.add("hidden");
  scoreSection.classList.remove("hidden");
  scoreText.textContent = `You answered ${score} out of ${questions.length} correctly.`;
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

restartButton.addEventListener("click", startQuiz);

// start the quiz on page load
startQuiz();
