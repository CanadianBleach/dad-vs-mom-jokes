import { fetchData } from "../utils/utils.js";

let momJokes = [
  {
    id: "1",
    joke: ""
  },
];

let momJoke = document.querySelector("#mom-joke");
let dadJoke = document.querySelector("#dad-joke");

momJoke.addEventListener("click", buttonPressed);
dadJoke.addEventListener("click", buttonPressed);

refreshButtons();

function buttonPressed() {
  updateJokes();
  refreshButtons();
  console.log(document.activeElement.id);
}
// Update the count
function updateJokes() {
  
}
// Refresh the buttons
async function refreshButtons() {
  let dadRes = await fetchData("https://icanhazdadjoke.com/");

dadJoke.textContent = dadRes.joke;

let momRes = await fetchData("https://icanhazdadjoke.com/");

momJoke.textContent = momRes.joke;
  
}