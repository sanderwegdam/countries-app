const regionContainerDOM = document.querySelector("#region-container");
const url = "data.json"; // Verander dit naar de werkelijke URL van je gegevens

let data; // Voeg een variabele toe om de gegevens op te slaan

const fetchData = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    data = await response.json(); // Sla de gegevens op in de "data" variabele
    displaySingleCountry();
  } catch (error) {
    console.error(error); // Toon de fout in de console
  }
};

fetchData();

const displaySingleCountry = () => {
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
  countryClone.querySelector(".population").textContent = country.population;
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
    <a href="detail-page.html?code=${border}" class="btn-borders">${getCountryNamesByBorders(border)}</a>
  `).join("");
  listDiv.innerHTML = borderList;
} else {
  listDiv.innerHTML = "<p>unknown</p>";
}
  regionContainerDOM.appendChild(countryClone);
};

function getCountryNamesByBorders(borderCode) {
  const country = data.find((country) => country.alpha3Code === borderCode);
  return country ? country.name : "Onbekend";
}


