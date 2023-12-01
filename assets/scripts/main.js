import { fetchData } from "../utils/utils.js";

let momJokes = [];
let dadJokes = [];

let momJoke = document.querySelector("#mom-joke");
let dadJoke = document.querySelector("#dad-joke");

momJoke.addEventListener("click", buttonPressed);
dadJoke.addEventListener("click", buttonPressed);

refreshButtons();

function buttonPressed() {
  updateJokes(document.activeElement.textContent, document.activeElement.id);
  refreshButtons();
  console.log(momJokes, dadJokes);
}
// Update the count
function updateJokes(joke, id) {
  if (id = "mom-joke") {
    momJokes.unshift(joke);
  } else {
    dadJokes.unshift(joke);
  }
}
// Refresh the buttons
async function refreshButtons() {
  let dadRes = await fetchData("https://icanhazdadjoke.com/");

dadJoke.textContent = dadRes.joke;

let momRes = await fetchData("https://icanhazdadjoke.com/");

momJoke.textContent = momRes.joke;
  
}