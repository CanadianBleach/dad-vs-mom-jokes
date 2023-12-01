import { fetchData } from "../utils/utils.js";

let momJoke = document.querySelector("#mom-joke");
let dadJoke = document.querySelector("#dad-joke");

let dadRes = await fetchData("https://icanhazdadjoke.com/");
console.log(dadRes);