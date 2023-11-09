const toggleDarkModeButton = document.querySelector(".dark-mode");
const body = document.body;

// Functie om de dark mode in te schakelen
function enableDarkMode() {
  body.classList.add("dark-modes");
  // Opslaan van de dark mode-instelling in de lokale opslag
  localStorage.setItem('darkMode', 'enabled');
}

// Functie om de dark mode uit te schakelen
function disableDarkMode() {
  body.classList.remove("dark-modes");
  // Opslaan van de dark mode-instelling in de lokale opslag
  localStorage.setItem('darkMode', 'disabled');
}

toggleDarkModeButton.addEventListener("click", function () {
  // Toggle de dark mode-klasse
  if (body.classList.contains("dark-modes")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

// Bij het laden van de pagina, controleer de dark mode-instelling in de lokale opslag
window.addEventListener('load', function () {
  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'enabled') {
    enableDarkMode();
  }
});