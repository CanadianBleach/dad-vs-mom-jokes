import { fetchData } from "../utils/utils.js";

let momJoke = document.querySelector("#mom-joke");
let dadJoke = document.querySelector("#dad-joke");

let data = await fetchData("https://api.yomomma.info/");
console.log(data);