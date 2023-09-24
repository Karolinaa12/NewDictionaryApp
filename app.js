//Form selector
const form = document.querySelector("#search-word-form");
//Result wrapper selector
const resultWrapper = document.querySelector(".result-wrapper");

//Result word and phonetic element
const result = document.createElement("div");
//result.id = "result";
//result.innerHTML = `<div class="result-wrapper">
//<h3 id="result-word-text"></h3>
//<h5 id="result-word-phonetic"></h5>
//<hr />`;

//API for dictionary
const dictAPI = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

//Search word
form.addEventListener("submit", function (e) {
  e.preventDefault();
  //Get the search word
  const inputWord = document.querySelector("#search-word").value;
  //Join search word to dictionary API URL
  const apiURL = `${dictAPI}${inputWord}`;
  console.log(apiURL);
  //Get word details
  fetch(apiURL)
    //return response as JSON
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data[0].word);
      console.log(data[0].phonetics);
    });

  //Clearing form after submit
  //document.querySelector("#search-word").value = "";
});
