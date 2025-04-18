const form = document.querySelector("form");
const search = document.querySelector("#search");
const inputRange = document.querySelector("#input-range");
const displayRangeValue = document.querySelector("#display-value");
const result = document.querySelector("#result");
const sortingInput = document.querySelectorAll(".btnSort");

let countries = [];
let valueRange = 24;
let valueSearch = "";
let sortType = "";

function updateRangeValue(value) {
  valueRange = Number(value);
  displayRangeValue.textContent = valueRange;
}

async function fetchCountries() {
  await fetch(`https://restcountries.com/v3.1/all`)
    .then((res) => res.json())
    .then((data) => (countries = data));
}

function countriesDisplay(countriesToDisplay) {
  result.innerHTML = countriesToDisplay

    .map((country) => {
      const flag = country.flags.svg;
      const alt = country.flags.alt || `${country.name.common} flag`;
      const countryName = country.name.common;
      const capital = country.capital || "Capital not available";
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
  let dataToFilter = countries.filter((country) =>
    country.name.common.toLowerCase().includes(valueSearch.toLowerCase())
  );

  switch (sortType) {
    case "minToMax":
      dataToFilter.sort((a, b) => a.population - b.population);
      break;
    case "maxToMin":
      dataToFilter.sort((a, b) => b.population - a.population);
      break;
    case "alpha":
      dataToFilter.sort((a, b) => a.name.common.localeCompare(b.name.common));
      break;
  }

  dataToFilter = dataToFilter.slice(0, valueRange);

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

sortingInput.forEach((input) => {
  input.addEventListener("click", function (e) {
    const selected = e.target.id;
    if (sortType === selected) {
      sortType = "";
      e.target.classList.remove("active");
    } else {
      sortingInput.forEach((input) => input.classList.remove("active"));

      sortType = selected;
      e.target.classList.add("active");
    }

    filterAndDisplay();
  });
});
