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

const toggleDarkModeButton = document.getElementById("toggleDarkMode");
const body = document.body;

toggleDarkModeButton.addEventListener("click", function () {
  body.classList.toggle("dark-modes");
  alert(1)
});