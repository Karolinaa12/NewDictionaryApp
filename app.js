//Form selector
const form = document.querySelector("#search-word-form");
//Result wrapper selector
const resultWrapper = document.querySelector(".result-wrapper");

//Result word and phonetic element
const result = document.createElement("div");
result.id = "result";
result.innerHTML = `<div class="result-wrapper">
<h3 id="result-word-text"></h3>

<h5 id="result-word-phonetic"></h5>
<button class="word-result-audio" onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
`;

//API for dictionary
const dictAPI = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

//Search word
form.addEventListener("submit", function (e) {
  e.preventDefault();
  //Get the search word
  const inputWord = document.querySelector("#search-word").value;
  //Join search word to dictionary API URL
  const apiURL = `${dictAPI}${inputWord}`;

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // search word recognized

      // update result wrapper to empty temporarily
      resultWrapper.innerHTML = ``;
      // Clone result elements
      var res = result.cloneNode(true);
      // display searched word
      res.querySelector("#result-word-text").innerText = data[0].word;

      // display searched word phonetic
      if (!!data[0].phonetic) {
        res.querySelector("#result-word-phonetic").innerText = data[0].phonetic;
      } else {
        if (!!data[0].phonetics) {
          Object.values(data[0].phonetics).map((phonetic) => {
            if (!!phonetic.text) {
              res.querySelector("#result-word-phonetic").innerText =
                phonetic.text;
              return false;
            }
          });
        }
      }
      Object.values(data[0].meanings).map((meaning) => {
        var meanings = ``;
        // display searched word part of speech
        meanings = `<h5 class="partOfSpeech">${meaning.partOfSpeech}</h5>`;
        Object.values(meaning.definitions).map((definition) => {
          // display searched word meaning
          meanings += `<p class="meaning">${definition.definition}</p>`;
        });
        res.innerHTML += `<div class="result-item">${meanings}</div>`;
      });
      //updating the result wrapper with the actual result
      resultWrapper.appendChild(res);
    })
    .catch((err) => {
      // show dialog box if entered or searched word in unknown
      alert("The word entered is Unknown.");
      console.error(err);
    });

  //Clearing form after submit
  document.querySelector("#search-word").value = "";
});
