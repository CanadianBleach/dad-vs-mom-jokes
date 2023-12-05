import { fetchData } from "../utils/utils.js";

let pastJokes = [];
let jokeIndex = 0;

let jokeElement = document.querySelector("#joke");
let dadJokeElement = document.querySelector("#dad-joke");

let dadJokeURL = "https://icanhazdadjoke.com/";
let jokeURL = "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,political,racist,sexist,explicit&type=single";

// Get and set jokes
let jokeResp = await fetchData(jokeURL);
let dadJokeResp = await fetchData(dadJokeURL);
// Set joke text, and get new jokes ready
// This prevents a delay in the jokes changing
refreshJokeText();
refreshJokes();

// Load jokes from local storage
loadJokes();

function refreshJokeText() {
  jokeElement.textContent = jokeResp.joke;
  dadJokeElement.textContent = dadJokeResp.joke;

  // Will be elements 0, 1 of array
  addJoke(jokeResp.joke, "joke");
  addJoke(dadJokeResp.joke, "dad-joke");
}

// Get new jokes to add
async function refreshJokes() {
  jokeResp = await fetchData(jokeURL);
  dadJokeResp = await fetchData(dadJokeURL);
}

// Log joke selected
function buttonPressed() {
  if (document.activeElement.id == "joke") {
    pastJokes[0].rating -= 3;
    pastJokes[1].rating += 3;
  } else {
    pastJokes[0].rating += 3;
    pastJokes[1].rating -= 3;
  }

  refreshJokeText();
  refreshJokes();

  console.log(pastJokes);
}

// Add joke to array
function addJoke(joke, id) {
  pastJokes.unshift({
    id: `${jokeIndex}`,
    type : `${id}`,
    jokeText : joke,
    rating : 50.0,
  });
  jokeIndex++;
}

function init() {
  jokeElement.addEventListener("click", buttonPressed);
  dadJokeElement.addEventListener("click", buttonPressed);
}


function loadJokes () {
  let data = JSON.parse(localStorage.getItem("jokes"));
  if (data == null){
    return;
  }
  for(let d in data){
    pastJokes.push(d);
  }
}


init();