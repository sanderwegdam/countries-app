const countriesContainerDOM = document.querySelector("#countries-container");
const url = "data.json";

const fetchData = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    displayCountries(data);
  } catch (error) {
    console.error(error); // Toon de fout in de console
  }
};

fetchData();

const displayCountries = (data) => {
  const countries = data
    .map(({ flag, name, population, region, capital, alpha3Code: code }) => {
      return `<a href="country.html?code=${code}" class="card">
        <img src="${flag}" alt="${name} flag" width="320" class="img" />
        <footer>
          <h2>${name}</h2>
          <p><span>Population:</span> ${population}</p>
          <p><span>Region:</span> ${region}</p>
          <p><span>Capital:</span> ${capital}</p>
        </footer>
      </a>`;
    })
    .join("");
  countriesContainerDOM.innerHTML = countries;
};