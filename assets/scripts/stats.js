import ScoreTile from "../utils/scoreTile.js"
let questions = document.querySelector("#questions");
let noneParent = document.querySelector("#none-saved");
let clearButton = document.querySelector("#clear");

let jokes = [];

function loadJokes() {
    let data = JSON.parse(localStorage.getItem("jokes"));
    if (data == null) {
        let element = document.createElement("h2");
        element.classList.add("is-size-3", "visible");
        element.textContent = "No questions to display. Go laugh at our jokes now..."
        noneParent.append(element);

        return;
    }
    for (let d in data) {
        jokes.push(data[d]);
    }
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
        questions.innerHTML = "";
        let element = document.createElement("h2");
        element.classList.add("is-size-3", "visible");
        element.textContent = "No questions to display. Go laugh at our jokes now..."
        noneParent.append(element);
    }, 1000);
}

function init() {
    clearButton.addEventListener("click", clearSaved);

    // Load jokes from storage
    loadJokes();

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
}

init();

console.log(localStorage.getItem("jokes"));


