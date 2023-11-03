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
    <div class="flex-container">
    <div class="region-wrapper">
    <div class="flex-left">
            <h1>${country.name}</h1>
            <p><strong>Native name:</strong> <span>${country.nativeName}</span></p>
            <p><strong>Population:</strong> <span>${country.population}</span></p>
            <p><strong>Region:</strong> <span>${country.region}</span></p>
            <p><strong>Sub region:</strong> <span>${country.subregion}</span></p>
            <p><strong>Capital:</strong> <span>${country.capital}</span></p>
          </div>
          <div class="flex-right">
            <p><span><strong>Top level domain: </strong></span>${country.topLevelDomain}</p>
            <p><span><strong>Currencies: </strong></span>${
              country.currencies ? country.currencies[0].name : "unknown"
            }</p>
            <p><span><strong>Languages: </strong></span>${
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
                          `<a href="detail-page.html?code=${border}" class="btn">${getCountryNamesByBorders(border)}</a>`
                      )
                      .join("")
                  : "<p>unknown</p>"
              }
              </div>
            </div>
            </div>
    `;

    regionContainerDOM.innerHTML = countryHTML;
  }
};

function getCountryNamesByBorders(borderCode) {
  const country = data.find((country) => country.alpha3Code === borderCode);
  return country ? country.name : "Onbekend";
}









