document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-button');
    const regionList = document.getElementById('region-list');

    toggleButton.addEventListener('click', function (e) {
        if (regionList.classList.contains('region-open')) {
            regionList.classList.remove('region-open');
        } else {
            regionList.classList.add('region-open');
        }
    });
});

const dropdownBtn = document.querySelector("#toggle-button");

const dropdownFiltering = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("region-link")) {
    dropdownBtn.dataset.selected = e.target.dataset.id;

    if (e.target.dataset.id === "All") {
      dropdownBtn.textContent = "Filter by Region";
    } else {
      dropdownBtn.textContent = `${e.target.textContent}`;
    }
  }
};

const regionLinks = document.querySelectorAll(".region-link");

regionLinks.forEach(link => {
  link.addEventListener("click", dropdownFiltering);
});

// Om de initiële tekst in te stellen:
dropdownBtn.textContent = "Filter by Region";