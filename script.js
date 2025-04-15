const result = document.querySelector("#result");
const search = document.querySelector("#search");
const form = document.querySelector("form");

let countries = [];

async function fetchCountries(search) {
  await fetch(`https://restcountries.com/v3.1/name/${search}`)
    .then((res) => res.json())
    .then((data) => (countries = data));

  // console.log(countries);
}

function countriesDisplay() {
  // console.log(country.flags);
  // if (country.length === 0) {
  //   content.innerHTML = `<h2>Aucun résultat</h2>`;
  // }
  countries.length = 12;
  console.log(countries);

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
  fetchCountries(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  countriesDisplay();
});
