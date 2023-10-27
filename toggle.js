document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleButton');
    const regionList = document.getElementById('regionList');

    toggleButton.addEventListener('click', function (e) {
        if (regionList.classList.contains('region-open')) {
            regionList.classList.remove('region-open');
        } else {
            regionList.classList.add('region-open');
        }
    });
});