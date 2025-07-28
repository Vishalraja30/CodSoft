const quizData = [];

function addQuestion() {
  const question = document.getElementById('question').value.trim();
  const options = [
    document.getElementById('option1').value.trim(),
    document.getElementById('option2').value.trim(),
    document.getElementById('option3').value.trim(),
    document.getElementById('option4').value.trim(),
  ];
  const correctRaw = document.getElementById('correct').value.trim();
  const correct = parseInt(correctRaw) - 1; // convert to 0-based index

  // Validation
  if (
    !question ||
    options.some(opt => opt === "") ||
    isNaN(correct) || correct < 0 || correct > 3
  ) {
    alert("Please fill all fields correctly.");
    return;
  }

  // Store the question
  quizData.push({ question, options, correct });

  // Save to localStorage
  localStorage.setItem('quizData', JSON.stringify(quizData));

  // Display preview
  displayQuiz();

  // Clear form
  clearForm();
}


function displayQuiz() {
  const container = document.getElementById('quiz-preview');
  container.innerHTML = "";

  quizData.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.innerHTML = `<strong>Q${index + 1}: ${q.question}</strong><ul>` +
      q.options.map((opt, i) => `<li>${opt} ${q.correct === i + 1 ? "(Correct)" : ""}</li>`).join('') +
      "</ul>";
    container.appendChild(qDiv);
  });
}

function clearForm() {
  document.getElementById('question').value = "";
  document.getElementById('option1').value = "";
  document.getElementById('option2').value = "";
  document.getElementById('option3').value = "";
  document.getElementById('option4').value = "";
  document.getElementById('correct').value = "";
}
function displayQuiz() {
  const container = document.getElementById('quiz-preview');
  container.innerHTML = "";

  quizData.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.innerHTML = `
      <strong>Q${index + 1}: ${q.question}</strong>
      <ul>
        ${q.options.map((opt, i) =>
          `<li>${opt} ${q.correct === i ? "(Correct)" : ""}</li>`
        ).join('')}
      </ul>
      <button onclick="deleteQuestion(${index})">Delete</button>
      <hr/>
    `;
    container.appendChild(qDiv);
  });
}
function finishQuiz() {
  // Save the quiz data to localStorage before navigating
  localStorage.setItem('quizData', JSON.stringify(quizData));

  // Redirect to the quiz page
  window.location.href = "quiz.html";
}

