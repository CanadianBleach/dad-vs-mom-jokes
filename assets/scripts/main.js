import { fetchData } from "../utils/utils.js";

localStorage.clear();

let pastJokes = [];
let jokeIndex = 0;

let momJokeElement = document.querySelector("#mom-joke");
let dadJokeElement = document.querySelector("#dad-joke");

// URLS
let dadJokeURL = "https://icanhazdadjoke.com/";
let yoMomJokeURL = "https://www.anthonycooper.me/momma";


// Get and set jokes
let momJokeResp = await fetchData(yoMomJokeURL);
let dadJokeResp = await fetchData(dadJokeURL);

// Load jokes from local storage
loadJokes();

// Set joke text, and get new jokes ready
// This prevents a delay in the jokes changing
refreshJokeText();
refreshJokes();

// Remove loading class
momJokeElement.classList.remove("is-loading");
dadJokeElement.classList.remove("is-loading");

function refreshJokeText() {
  momJokeElement.textContent = momJokeResp.joke;
  dadJokeElement.textContent = dadJokeResp.joke;

  // Will be elements 0, 1 of array
  addJoke(momJokeResp.joke, "mom-joke");
  addJoke(dadJokeResp.joke, "dad-joke");
}

// Get new jokes to add
async function refreshJokes() {
  momJokeResp = await fetchData(yoMomJokeURL);
  dadJokeResp = await fetchData(dadJokeURL);
}

// Log joke selected
function buttonPressed() {
  if (document.activeElement.id == "mom-joke") {
    pastJokes[0].rating -= 3;
    pastJokes[1].rating += 3;
  } else {
    pastJokes[0].rating += 3;
    pastJokes[1].rating -= 3;
  }

  if ((jokeIndex / 2) % 5 == 0) {
    tryOldJoke();
  } else {
    refreshJokeText();
    refreshJokes();
  }
}

function tryOldJoke() {
  // Skip first two index which are current most jokes
  let joke = pastJokes[2 + Math.floor(Math.random() * (pastJokes.length - 2))];
  console.log(joke);

  if (joke.type == "mom-joke") {
    momJokeElement.textContent = joke.jokeText;
    dadJokeElement.textContent = dadJokeResp.joke;

    // Since loaded dad joke was used
    dadJokeResp = fetchData(dadJokeURL);
    addJoke(dadJokeResp.joke, "dad-joke");
  } else {
    dadJokeElement.textContent = joke.jokeText;
    momJokeElement.textContent = momJokeResp.joke;
    
    // Since loaded mom joke was used
    momJokeResp = fetchData(yoMomJokeURL);
    addJoke(momJokeResp.joke, "mom-joke");
  }
}

// Add joke to array
function addJoke(joke, elemId) {
  // TODO Check for dupe

  pastJokes.unshift({
    id: jokeIndex,
    type: `${elemId}`,
    jokeText: joke,
    rating: 50.0,
  });

  saveJokes();

  jokeIndex++;
}

function init() {
  momJokeElement.addEventListener("click", buttonPressed);
  dadJokeElement.addEventListener("click", buttonPressed);
}

function loadJokes() {
  let data = JSON.parse(localStorage.getItem("jokes"));
  if (data == null) {
    return;
  }
  for (let d in data) {
    pastJokes.push(data[d]);
  }
  jokeIndex = data[0].id + 1;
}

function saveJokes() {
  let toSave = JSON.stringify(pastJokes);
  localStorage.setItem("jokes", toSave);
}

init();

