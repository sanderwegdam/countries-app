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

  if (country) {
    // Bouw de HTML-structuur voor het enkele land
    const countryHTML = `
      <img src="${country.flags.png}" alt="${country.name} flag" class="img" />
      <div class="country-info">
        <h2>${country.name}</h2>
        <div class="wrapper">
          <div class="flex-left">
            <p><span>native name: </span>${country.nativeName}</p>
            <p><span>population: </span>${country.population}</p>
            <p><span>region: </span>${country.region}</p>
            <p><span>sub region: </span>${country.subregion}</p>
            <p><span>capital: </span>${country.capital}</p>
          </div>
          <div class="flex-right">
            <p><span>top level domain: </span>${country.topLevelDomain}</p>
            <p><span>currencies: </span>${
              country.currencies ? country.currencies[0].name : "unknown"
            }</p>
            <p><span>languages: </span>${
              country.languages
                ? country.languages
                    .map((language) => {
                      return language.name;
                    })
                    .join(", ")
                : "unknown"
            }</p>
          </div>
        </div>
        <div class="border-countries">
          <h3>Border countries:</h3>
          <div class="list">
            ${
              country.borders
                ? country.borders
                    .map(
                      (border) =>
                        `<a href="country.html?code=${border}" class="btn">${border}</a>`
                    )
                    .join("")
                : "<p>unknown</p>"
            }
          </div>
        </div>
      </div>`;

    regionContainerDOM.innerHTML = countryHTML;
  }
};










