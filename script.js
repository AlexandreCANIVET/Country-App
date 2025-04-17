const form = document.querySelector("form");
const search = document.querySelector("#search");
const inputRange = document.querySelector("#input-range");
const displayValue = document.querySelector("#display-value");
const result = document.querySelector("#result");

let countries = [];
let valueRange = 24;
let valueSearch = "";

function updateRangeValue(value) {
  valueRange = Number(value);
  displayValue.textContent = valueRange;
}

async function fetchCountries() {
  await fetch(`https://restcountries.com/v3.1/all`)
    .then((res) => res.json())
    .then((data) => (countries = data));

  console.log(countries);
}

function countriesDisplay(countriesToDisplay) {
  result.innerHTML = countriesToDisplay

    .map((country) => {
      const flag = country.flags.svg;
      const alt = country.flags.alt || `${country.name.common} flag`;
      const countryName = country.name.common;
      const capital = country.capital;
      const population = country.population;

      return `
        <li class="card">
        <div class="img-container">
        <img src="${flag}" alt="${alt}">
        </div>
        <h2>${countryName}</h2>
        <p>${capital}</p>
        <p>Population : ${population}</p>
        </li>
        `;
    })
    .join("");
}

function filterAndDisplay() {
  const dataToFilter = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(valueSearch.toLowerCase())
    )
    .slice(0, valueRange);

  countriesDisplay(dataToFilter);
}

search.addEventListener("input", (e) => {
  valueSearch = e.target.value;
  filterAndDisplay();
});

inputRange.addEventListener("input", (e) => {
  updateRangeValue(e.target.value);
  filterAndDisplay();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
  fetchCountries().then(() => filterAndDisplay());
});
