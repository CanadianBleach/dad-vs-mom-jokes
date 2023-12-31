import ScoreTile from "../utils/scoreTile.js"
let questions = document.querySelector("#questions");
let noneParent = document.querySelector("#none-saved");
let clearButton = document.querySelector("#clear");

let jokes = [];

function loadJokes() {
    let data = JSON.parse(localStorage.getItem("jokes"));
    if (data == null) {
        createNoneText();
        return;
    }
    for (let d in data) {
        jokes.push(data[d]);
    }
}

function createNoneText() {
    questions.innerHTML = "";
    let element = document.createElement("a");
    element.classList.add("is-size-3", "visible");
    element.href = "../../index.html";
    element.textContent = "No questions to display. Go laugh at our jokes now..."
    noneParent.append(element);
}

function clearSaved() {
    if (localStorage.getItem("jokes") == null)
        return;

    // Fade out
    questions.classList.remove("visible");
    questions.classList.add("hidden");

    // Clear
    localStorage.clear();

    // Wait for fade out and fade in new text
    setTimeout(() => {
        createNoneText();
    }, 400);
}

function init() {
    questions.classList.remove("hidden");
    clearButton.addEventListener("click", clearSaved);

    // Load jokes from storage
    loadJokes();


    if (jokes.length == 0)
        return;

    // Sort jokes by rating
    let sortedJokes = jokes.sort((a, b) => {
        if (a.rating > b.rating) {
            return -1;
        }
        if (a.rating < b.rating) {
            return 1;
        }
        return 0;
    });

    // Add leaderboard text
    let leaderboardElm = document.createElement("h1");
    leaderboardElm.classList.add("visible", "title", "has-text-centered");
    leaderboardElm.textContent = "Leaderboard";
    questions.append(leaderboardElm);

    // Create and populate tiles for jokes
    for (let j in sortedJokes) {
        let element = new ScoreTile(j, sortedJokes[j].rating, sortedJokes[j].jokeText)
        questions.appendChild(element);
    }

    // Fade in
    questions.classList.add("visible");
}

init();

