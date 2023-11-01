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