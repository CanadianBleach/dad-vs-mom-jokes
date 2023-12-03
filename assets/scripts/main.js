import { fetchData } from "../utils/utils.js";

let jokes = [];
let dadJokes = [];

let jokeElement = document.querySelector("#joke");
let dadJokeElement = document.querySelector("#dad-joke");

// Get and set jokes
let jokeResp = await fetchData("https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,political,racist,sexist,explicit&type=single");
let dadJokeResp = await fetchData("https://icanhazdadjoke.com/");
// Set joke text, and get new jokes ready
// This prevents a delay in the jokes changing
refreshJokeText();
refreshJokes();

function refreshJokeText() {
  jokeElement.textContent = jokeResp.joke;
  dadJokeElement.textContent = dadJokeResp.joke;
}

// Get new jokes to add
async function refreshJokes() {
  jokeResp = await fetchData("https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,political,racist,sexist,explicit&type=single");
  dadJokeResp = await fetchData("https://icanhazdadjoke.com/");
}

// Log joke selected
function buttonPressed() {
  // Add winning jokes to array
  // Adds via textContent so we must do it before we change the text
  addJoke(document.activeElement.textContent, document.activeElement.id);

  refreshJokeText();
  refreshJokes();
}

// Update the count
function addJoke(joke, id) {
  if (id = "joke") {
    jokes.unshift(joke);
  } else {
    dadJokes.unshift(joke);
  }
}

function init() {
  jokeElement.addEventListener("click", buttonPressed);
  dadJokeElement.addEventListener("click", buttonPressed);
}

init();