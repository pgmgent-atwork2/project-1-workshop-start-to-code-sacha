let questionsByCategory = {};
let selectedQuestions = [];
let currentQuestion = 0;
let score = 0;

fetch("./src/questions.json")
  .then((res) => res.json())
  .then((data) => {
    questionsByCategory = data;
  })
  .catch((error) => {
    console.error("Erreur lors du chargement des données :", error);
  });

function startQuiz() {
  const category = document.getElementById("categorySelect").value;
  const allQuestions = questionsByCategory[category];
  if (!allQuestions) {
    alert("Er zijn geen vragen voor deze categorie.");
    return;
  }

  selectedQuestions = shuffle(allQuestions).slice(0, 5);
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function showQuestion() {
  const q = selectedQuestions[currentQuestion];
  document.getElementById("question").textContent = q.question;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(choice);
    choicesDiv.appendChild(btn);
  });

  document.getElementById("result").textContent = "";
  document.getElementById("nextBtn").style.display = "none";
}

function checkAnswer(choice) {
  const correct = selectedQuestions[currentQuestion].answer;
  const result = document.getElementById("result");

  if (choice === correct) {
    result.textContent = "Juist! ✅";
    score++;
  } else {
    result.textContent = `Fout ❌ (Juist: ${correct})`;
  }

  document.querySelectorAll("#choices button").forEach((btn) => {
    btn.disabled = true;
  });

  document.getElementById("nextBtn").style.display = "inline";
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < selectedQuestions.length) {
    showQuestion();
  } else {
    document.getElementById("question").textContent = "Quiz klaar!";
    document.getElementById("choices").innerHTML = "";
    document.getElementById(
      "result"
    ).textContent = `Score: ${score}/${selectedQuestions.length}`;
    document.getElementById("nextBtn").style.display = "none";
  }
}
