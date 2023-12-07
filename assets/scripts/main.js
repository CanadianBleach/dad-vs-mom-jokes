import { fetchData } from "../utils/utils.js";

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

  if (jokeIndex % 5 == 0) {
  tryOldJoke();
  } else {
    refreshJokeText();
    refreshJokes();
  }
}

function tryOldJoke() {
  let joke = pastJokes[Math.floor(Math.random()*pastJokes.length)];
  console.log(joke);
  console.log(jokeIndex);
}

// Add joke to array
function addJoke(joke, elemId) {
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

