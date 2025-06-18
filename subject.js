let questions = [];
document.addEventListener("DOMContentLoaded", () => {
    fetch("questions.json")
        .then(response => response.json())
        .then(data => {
            questions = data;
            const params = new URLSearchParams(window.location.search);
            const subject = params.get("subject");
            if (subject) {
                document.getElementById("subjectTitle").textContent = `${subject} Questions`;
                displayQuestions(subject);
            } else {
                document.getElementById("questionList").innerHTML = "<p>No subject selected.</p>";
            }
        })
        .catch(error => console.error("Error loading questions:", error));
});

// Display questions grouped by year
function displayQuestions(subject) {
    const questionList = document.getElementById("questionList");
    questionList.innerHTML = "";
    const subjectQuestions = questions.filter(q => q.subject === subject);
    const questionsByYear = {};
    subjectQuestions.forEach(q => {
        if (!questionsByYear[q.year]) {
            questionsByYear[q.year] = [];
        }
        questionsByYear[q.year].push(q);
    });
    const years = Object.keys(questionsByYear).sort((a, b) => b - a);
    years.forEach(year => {
        const yearSection = document.createElement("div");
        yearSection.className = "year-section";
        yearSection.innerHTML = `<h2>${year}</h2>`;
        questionsByYear[year].forEach(q => {
            const questionItem = document.createElement("div");
            questionItem.className = "question-item";
            questionItem.innerHTML = `<p>${q.question}</p>`;
            yearSection.appendChild(questionItem);
        });
        questionList.appendChild(yearSection);
    });
    if (years.length === 0) {
        questionList.innerHTML = "<p>No questions found for this subject.</p>";
    }
}