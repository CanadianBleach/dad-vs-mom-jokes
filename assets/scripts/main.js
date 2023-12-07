import { fetchData } from "../utils/utils.js";

localStorage.clear();

let jokes = [];
let jokeIndex = 0;
let questionsAnswered = 0;

let momJokeElement = document.querySelector("#mom-joke");
let dadJokeElement = document.querySelector("#dad-joke");

// URLS
let dadJokeURL = "https://icanhazdadjoke.com/";
let yoMomJokeURL = "https://www.anthonycooper.me/momma";

// Get and set jokes
let momJokeResp = await fetchData(yoMomJokeURL);
let dadJokeResp = await fetchData(dadJokeURL);

// Load jokes from local storage
loadJokes();// Set joke text, and get new jokes ready
// This prevents a delay in the jokes changing

// Will be elements 0, 1 of array
addJoke(momJokeResp.joke, "mom-joke");
addJoke(dadJokeResp.joke, "dad-joke");

// Set joke text, and get new jokes ready
// This prevents a delay in the jokes changing
refreshJokeText();
reloadJokes();

// Remove loading class
momJokeElement.classList.remove("is-loading");
dadJokeElement.classList.remove("is-loading");

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

  console.log(index);
  console.log(joke);
  console.log(jokes);

  if (joke.type == "mom-joke") {
    // Splice in mom joke and add dad joke response to array
    jokes.unshift(joke);
    addJoke(dadJokeResp.joke, "dad-joke");
  } else {    
    // Splice in dad joke and add mom joke response to array
    addJoke(momJokeResp.joke, "mom-joke");
    jokes.unshift(joke);
  }

  console.log(jokes);
}

// Add joke to array
function addJoke(joke, elemId) {
  for (let joke in jokes) {
    if (jokes[joke].jokeText == jokes) {
      console.log("CAUGHT DUPE");
      return;
    }
  }

  jokes.unshift({
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
    jokes.push(data[d]);
  }
  jokeIndex = data[0].id + 1;
}

function saveJokes() {
  let toSave = JSON.stringify(jokes);
  localStorage.setItem("jokes", toSave);
}

init();

