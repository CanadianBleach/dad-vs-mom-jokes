import { fetchData } from "../utils/utils.js";

let jokes = [];
let jokeIndex = 0;
let questionsAnswered = 0;

let momJokeElement = document.querySelector("#mom-joke");
let dadJokeElement = document.querySelector("#dad-joke");
let questionsElem = document.querySelector("#questions");

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

// Will be elements 0, 1 of array
addJoke(momJokeResp.joke, "mom-joke");
addJoke(dadJokeResp.joke, "dad-joke");

// Set joke text, and get new jokes ready
// This prevents a delay in the jokes changing
refreshJokeText();
reloadJokes();

questionsElem.classList.remove("hidden");
questionsElem.classList.add("visible");

function refreshJokeText() {
  // Mom jokes is 1, dad joke is 0
  momJokeElement.textContent = jokes[1].jokeText;
  dadJokeElement.textContent = jokes[0].jokeText;
}

// Get new jokes to add
async function reloadJokes() {
  momJokeResp = await fetchData(yoMomJokeURL);
  dadJokeResp = await fetchData(dadJokeURL);
}

// Log joke selected
function buttonPressed() {
  saveJokes();

  questionsAnswered++;

  if (document.activeElement.id == "mom-joke") {
    jokes[0].rating -= 3;
    jokes[1].rating += 3;
  } else {
    jokes[0].rating += 3;
    jokes[1].rating -= 3;
  }

  // Check to see if we want to try and old joke
  if ((questionsAnswered) % 3 == 0) {
    tryOldJoke();
    refreshJokeText();
    reloadJokes();
  } else {
    // Add stored jokes to array and refresh text
    addJoke(momJokeResp.joke, "mom-joke");
    addJoke(dadJokeResp.joke, "dad-joke");
    refreshJokeText();
    reloadJokes();
  }
}

function tryOldJoke() {
  // Skip first two index which are current most jokes
  let index = 2 + Math.floor(Math.random() * (jokes.length - 2));
  let joke = jokes[index];
  
  // Remove joke
  jokes.splice(index, 1);

  if (joke.type == "mom-joke") {
    // Splice in mom joke and add dad joke response to array
    jokes.unshift(joke);
    addJoke(dadJokeResp.joke, "dad-joke");
  } else {    
    // Splice in dad joke and add mom joke response to array
    addJoke(momJokeResp.joke, "mom-joke");
    jokes.unshift(joke);
  }
}

// Add joke to array
function addJoke(joke, elemId) {
  for (let joke in jokes) {
    if (jokes[joke].jokeText == jokes) {
      return;
    }
  }

  jokes.unshift({
    id: jokeIndex,
    type: `${elemId}`,
    jokeText: joke,
    rating: 50.0,
  });

  jokeIndex++;
}

function init() {
  momJokeElement.addEventListener("click", buttonPressed);
  dadJokeElement.addEventListener("click", buttonPressed);
}

function loadJokes() {
  let data = localStorage.getItem("jokes");
  let parsed = JSON.parse(data);
  if (parsed == null) {
    return;
  }
  for (let i in parsed) {
    jokes.push(parsed[i]);
  }

  jokeIndex = parsed[0].id + 1;
}

function saveJokes() {
  let toSave = JSON.stringify(jokes);
  localStorage.setItem("jokes", toSave);
}

init();

