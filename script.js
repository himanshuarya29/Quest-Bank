let questions = [];
fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
        const subjects = [...new Set(questions.map(q => q.subject))];
        displaySubjects(subjects);
    })
    .catch(error => console.error("Error loading questions:", error));

// Load subjects on page load
document.addEventListener("DOMContentLoaded", () => {
    // Search functionality
    document.getElementById("searchBar").addEventListener("input", (e) => {
        filterSubjects(e.target.value);
    });
});

// Display subjects
function displaySubjects(subjects) {
    const subjectList = document.getElementById("subjectList");
    subjectList.innerHTML = "";
    subjects.forEach(subject => {
        const card = document.createElement("div");
        card.className = "subject-card";
        card.innerHTML = `<h3>${subject}</h3>`;
        card.addEventListener("click", () => {
            window.location.href = `subject.html?subject=${encodeURIComponent(subject)}`;
        });
        subjectList.appendChild(card);
    });
}

// Filter subjects
function filterSubjects(searchTerm) {
    const filteredSubjects = subjects.filter(subject =>
        subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displaySubjects(filteredSubjects);
}