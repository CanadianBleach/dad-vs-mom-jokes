import ScoreTile from "../utils/scoreTile.js"
let parentDiv = document.querySelector("#questions");

function loadJokes() {
    let data = JSON.parse(localStorage.getItem("jokes"));
    if (data == null) {
        return;
    }

    return data;
}

function init() {
    let jokes = loadJokes();
    let sortedJokes = jokes.sort((a, b) => {
        if (a.rating > b.rating) {
            return -1;
        }
        if (a.rating < b.rating) {
            return 1;
        }
        return 0;
    });

    console.log(sortedJokes);

    for (let j in sortedJokes) {
        let element = new ScoreTile(j, sortedJokes[j].rating, sortedJokes[j].jokeText)
        parentDiv.appendChild(element);
    }
}

init();


