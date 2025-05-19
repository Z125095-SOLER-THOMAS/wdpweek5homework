let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result");

function shuffleArray(array) 
{
    for (let i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function setProgress(percent) {
  const bar = document.getElementById("progress-bar");
  bar.style.width = percent + "%";
}

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = shuffleArray(data);
    showQuestion();
  });

function showQuestion() {
    clearOptions();
    document.getElementById("question-count").textContent =
    `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    const q = questions[currentQuestionIndex];
    questionText.textContent = q.question;

    q.options.forEach((option, index) => {
        let obutton = document.createElement('button');

        obutton.id = `options${index}`;
        obutton.className = 'option';
        obutton.textContent = q.options[index];
        obutton.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(obutton);
    });
}

function checkAnswer(selectedIndex) {
  const correct = questions[currentQuestionIndex].answer;
  if (selectedIndex === correct) {
    score++;
  }
  nextBtn.disabled = false;
  Array.from(optionsContainer.children).forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.style.backgroundColor = "#a4edba";
    if (i === selectedIndex && i !== correct) btn.style.backgroundColor = "#f5a3a3";
  });
}

function clearOptions() 
{
    optionsContainer.innerHTML = ``;
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    setProgress(currentQuestionIndex * 100 / questions.length);
    if(currentQuestionIndex < questions.length)
        showQuestion();
    else
        showResult();
});


function showResult() {
  document.querySelector(".quiz-box").innerHTML = `<h2>Your score: ${score} / ${questions.length}</h2>`;
}