const form = document.querySelector("#search-word-form");
const resultWrapper = document.querySelector(".result-wrapper");
const result = document.createElement("div");
result.id = "result";

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const search = document.querySelector("#search-word");
  console.log(search.value);
  search.value = "";
});
