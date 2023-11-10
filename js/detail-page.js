import fetchData from './fetch.js';

const regionContainerDOM = document.querySelector("#region-container");

async function displaySingleCountry() {
  try {
    const data = await fetchData();

  const urlParams = new URLSearchParams(window.location.search);
  const countryCode = urlParams.get("code");

  // Zoek het bijbehorende land in je gegevens
  const country = data.find((c) => c.alpha3Code === countryCode);

  console.log(country);

  const template = document.getElementById("country-template");
  const countryClone = document.importNode(template.content, true);

  // Vervang de placeholders in de gekloonde HTML met de werkelijke gegevens
  countryClone.querySelector("img").src = country.flags.png;
  countryClone.querySelector("img").alt = country.name;
  countryClone.querySelector("h1").textContent = country.name;
  countryClone.querySelector(".native-name").textContent = country.nativeName;
  countryClone.querySelector(".population").textContent = numberWithDots(country.population);
  countryClone.querySelector(".region-name").textContent = country.region;
  countryClone.querySelector(".sub-region").textContent = country.subregion;
  countryClone.querySelector(".capital").textContent = country.capital;
  countryClone.querySelector(".top-level-domain").textContent = country.topLevelDomain;
  countryClone.querySelector(".currencies").textContent =
  country.currencies ? country.currencies[0].name : "unknown";
  countryClone.querySelector(".languages").textContent =   country.languages
  ? country.languages
      .map((language) => {
        return language.name;
      })
      .join(", ")
  : "unknown";

const listDiv = countryClone.querySelector(".list");
if (country.borders) {
  const borderList = country.borders.map((border) => `
    <a href="detail-page.html?code=${border}" class="btn-borders">${getCountryNamesByBorders(border, data)}</a>
  `).join("");
  listDiv.innerHTML = borderList;
} else {
  listDiv.innerHTML = "<p>unknown</p>";
}
  regionContainerDOM.appendChild(countryClone);
} catch (error) {
  console.error(error);
}
}

displaySingleCountry();

function getCountryNamesByBorders(borderCode, data) {
  const country = data.find((country) => country.alpha3Code === borderCode);
  return country ? country.name : "Onbekend";
}

const numberWithDots = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

