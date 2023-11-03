const countriesContainerDOM = document.querySelector("#countries-container");
const url = "data.json"; // Verander dit naar de werkelijke URL van je gegevens

let data; // Voeg een variabele toe om de gegevens op te slaan

const fetchData = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    data = await response.json(); // Sla de gegevens op in de "data" variabele
    filterAndDisplayCountries();
  } catch (error) {
    console.error(error); // Toon de fout in de console
  }
};

fetchData();

const dropdownBtn = document.querySelector("#toggle-button");
const searchInput = document.querySelector("#search-input");

const dropdownFiltering = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("region-link")) {
    dropdownBtn.dataset.selected = e.target.dataset.id;

    if (e.target.dataset.id === "All") {
      dropdownBtn.textContent = "Filter by Region";
    } else {
      dropdownBtn.textContent = `${e.target.textContent}`;
    }

    filterAndDisplayCountries();
  }
};

const regionLinks = document.querySelectorAll(".region-link");

regionLinks.forEach(link => {
  link.addEventListener("click", dropdownFiltering);
});

searchInput.addEventListener("input", filterAndDisplayCountries);

function filterAndDisplayCountries() {
  const selectedRegion = dropdownBtn.dataset.selected;
  const searchValue = searchInput.value.toLowerCase();
  const filteredCountries = data.filter(country => {
    // Als de geselecteerde regio "All" is of overeenkomt met de regio van het land
    // en de zoekterm komt voor in de naam van het land, toon het land
    return (
      (selectedRegion === "All" || country.region === selectedRegion) &&
      country.name.toLowerCase().includes(searchValue)
    );
  });

  const countries = filteredCountries
    .map(({ flags, name, population, region, capital, alpha3Code: code }) => {
      return `<a href="detail-page.html?code=${code}" class="card">
        <img src="${flags.png}" alt="${name} flag" class="img" />
          <h3>${name}</h3>
          <p><span>Population:</span> ${population}</p>
          <p><span>Region:</span> ${region}</p>
          <p><span>Capital:</span> ${capital}</p>
      </a>`;
    })
    .join("");

  countriesContainerDOM.innerHTML = `<div class="countries-grid">${countries}</div>`;
}

dropdownBtn.textContent = "Filter by Region";