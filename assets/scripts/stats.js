import ScoreTile from "../utils/scoreTile.js"
let parentDiv = document.querySelector("#questions");
let clearButton = document.querySelector("#clear");

function loadJokes() {
    let data = JSON.parse(localStorage.getItem("jokes"));
    if (data == null) {
        return;
    }

    return data;
}

function clearSaved() {
    if (parentDiv.childNodes.length <= 2)
        return;

    parentDiv.classList.remove("visible");
    parentDiv.classList.add("hidden");
    localStorage.clear();
}

function init() {
    clearButton.addEventListener("click", clearSaved);

    let jokes = loadJokes();

    setTimeout(function () { parentDiv.classList.remove("toFade"); }, 1500);

    if (jokes == null) {
        let element = document.createElement("h2");
        element.classList.add("is-size-3");
        element.textContent = "No questions to display. Go laugh at out jokes now..."
        parentDiv.append(element);

        return;
    }

    let sortedJokes = jokes.sort((a, b) => {
        if (a.rating > b.rating) {
            return -1;
        }
        if (a.rating < b.rating) {
            return 1;
        }
        return 0;
    });

    for (let j in sortedJokes) {
        let element = new ScoreTile(j, sortedJokes[j].rating, sortedJokes[j].jokeText)
        parentDiv.appendChild(element);
    }
}

init();


