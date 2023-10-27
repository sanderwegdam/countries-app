document.addEventListener('DOMContentLoaded', function () {
    const regionDetails = document.getElementById('regionDetails');
    const regionLinks = document.querySelectorAll('.region-link');
  
    // Voeg een click-eventlistener toe aan de regio's
    regionLinks.forEach(function (regionLink) {
      regionLink.addEventListener('click', function () {
        // Haal gegevens van de geklikte regio op
        const regionName = regionLink.textContent;
        fetchRegionData(regionName);
      });
    });
  
    // Functie om gegevens van een specifieke regio op te halen
    function fetchRegionData(regionName) {
      fetch('data.json') // Vervang 'data.json' door de daadwerkelijke URL van je JSON-bestand
        .then(response => response.json())
        .then(data => {
          const region = data.find(item => item.name === regionName);
  
          if (region) {
            displayRegionDetails(region);
          } else {
            console.error('Regio niet gevonden.');
          }
        })
        .catch(error => {
          console.error('Fout bij het ophalen van gegevens: ' + error);
        });
    }
  
    // Functie om regio-details weer te geven
    function displayRegionDetails(region) {
      regionDetails.innerHTML = ''; // Leeg de regio-details div
      const regionTitle = document.createElement('h2');
      regionTitle.textContent = region.name;
      regionDetails.appendChild(regionTitle);
      // Voeg andere eigenschappen van de regio toe aan regionDetails
      // Voorbeeld: topLevelDomain, alpha2Code, enz.
    }
  });