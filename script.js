const form = document.querySelector("form");
const search = document.querySelector("#search");
const inputRange = document.querySelector("#input-range");
const displayValue = document.querySelector("#display-value");
const result = document.querySelector("#result");

let countries = [];
let valueRange = 24;
let valueSearch = "";

async function updateRangeValue(value) {
  valueRange = Number(value);
  displayValue.textContent = valueRange;
  return valueRange;
}

async function fetchCountries(search = "") {
  if (search !== "") {
    search = `name/${search}`;
  } else search = "all";
  await fetch(`https://restcountries.com/v3.1/${search}`)
    .then((res) => res.json())
    .then((data) => (countries = data));

  console.log(countries);
}

function countriesDisplay(value) {
  countries.length = value;

  result.innerHTML = countries
    .map((country) => {
      return `
        <li class="card">
        <div class="img-container">
        <img src="${country.flags.svg}" alt="${
        country.flags.alt === undefined
          ? `${country.name.common} flag`
          : country.flags.alt
      }">
        </div>
        <h2>${country.name.common}</h2>
        <p>${country.capital}</p>
        <p>Population : ${country.population}</p>
        </li>
        `;
    })
    .join("");
}

search.addEventListener("input", (e) => {
  valueSearch = e.target.value;
  fetchCountries(valueSearch).then(() => countriesDisplay(valueRange));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

inputRange.addEventListener("input", (e) => {
  if (valueRange > e.target.value) {
    updateRangeValue(e.target.value).then(() => countriesDisplay(valueRange));
  } else if (valueRange < e.target.value) {
    updateRangeValue(e.target.value)
      .then(() => fetchCountries(valueSearch))
      .then(() => countriesDisplay(valueRange));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetchCountries(valueSearch).then(() => countriesDisplay(valueRange));
});
