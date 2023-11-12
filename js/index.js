import fetchData from './fetch.js';

const countriesContainerDOM = document.querySelector("#countries-container");

async function fetchDataAndDisplay() {
  console.log("fetchDataAndDisplay called");
  try {
    const data = await fetchData();
    console.log("Data received:", data);

    const dropdownBtn = document.querySelector("#toggle-button");
    const searchInput = document.querySelector("#search-input");
    const regionList = document.getElementById('region-list');
    const filterRegion = document.querySelector('.filter-region');
    
    const dropdownFiltering = (e) => {
      e.preventDefault();
      const isRegionLink = e.target.classList.contains("region-link");
    
      if (isRegionLink) {
        const newSelectedRegion = e.target.dataset.id;
        dropdownBtn.dataset.selected = newSelectedRegion;
    
        if (newSelectedRegion === "All") {
          filterRegion.textContent = "Region: All";
        } else {
          filterRegion.textContent = `Region: ${e.target.textContent}`; // Voeg een pijl toe
        }
        closeDropdownMenu();
        filterAndDisplayCountries();
      }
    };

    const closeDropdownMenu = () => {
      // Voeg hier je logica toe om het dropdown-menu te sluiten
      // Bijvoorbeeld, als je een CSS-klasse gebruikt om het menu te verbergen:
      // dropdownMenu.classList.add("hidden");
      regionList.classList.remove("region-open");
    };
    
    const regionLinks = document.querySelectorAll(".region-link");
    
    regionLinks.forEach(link => {
      link.addEventListener("click", dropdownFiltering);
    });

    searchInput.addEventListener("input", () => filterAndDisplayCountries());

    function filterAndDisplayCountries() {
      const selectedRegion = dropdownBtn.dataset.selected;
      const searchValue = searchInput.value.toLowerCase();

      const filteredCountries = data.filter(country => {
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
              <p><span>Population:</span> ${numberWithDots(population)}</p>
              <p><span>Region:</span> ${region}</p>
              <p><span>Capital:</span> ${capital}</p>
          </a>`;
        })
        .join("");

      countriesContainerDOM.innerHTML = `<div class="countries-grid">${countries}</div>`;
    }

    filterAndDisplayCountries();

    // dropdownBtn.textContent = "Filter by Region";
  } catch (error) {
    console.log("Error in fetchDataAndDisplay:", error);
  }
}

// Call the asynchronous function
document.addEventListener("DOMContentLoaded", fetchDataAndDisplay);

const numberWithDots = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};