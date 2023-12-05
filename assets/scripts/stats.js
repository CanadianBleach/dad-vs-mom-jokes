let parentDiv = document.querySelector("#parent");

function loadJokes() {
    let data = JSON.parse(localStorage.getItem("jokes"));
    if (data == null) {
        return;
    }
    for (let d in data) {
        let element = document.createElement("p");
        element.textContent = `${data[d].jokeText}: ${data[d].rating}`;
        parentDiv.appendChild(element);

    }
}

loadJokes();