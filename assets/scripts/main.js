//import { fetchData } from "../utils/utils.js";

let momJoke = document.querySelector("#mom-joke");
let dadJoke = document.querySelector("#dad-joke");

/*let data = await fetchData("https://icanhazdadjoke.com/");
console.log(data);*/

fetch("https://icanhazdadjoke.com/",{
    headers:{
        "Accept":"application/json"
    }
})
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
    })
