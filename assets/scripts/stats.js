import ScoreTile from "../utils/scoreTile.js"

let parentDiv = document.querySelector("#parent");

function loadJokes() {
    let data = JSON.parse(localStorage.getItem("jokes"));
    if (data == null) {
        return;
    }
    for (let d in data) {
        let element = new ScoreTile(d, data[d].rating, data[d].jokeText)
        parentDiv.appendChild(element);
    }
}

loadJokes();