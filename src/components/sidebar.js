// sidebar.js
export function renderSidebar(onClickHome, onClickToggleUnits) {
    const homeButton = document.getElementById('home-button');
    const homeIcon = document.createElement('i');
    homeIcon.className = 'fa-solid fa-house sidebar-icon';
    homeButton.appendChild(homeIcon);
    const homeText = document.createElement('span');
    homeText.className = 'sidebar-text';
    homeText.textContent = 'Home';
    homeButton.appendChild(homeText);
    homeButton.addEventListener('click', onClickHome);


    const toggleUnitsButton = document.getElementById('toggle-units-button');
    const toggleUnitsIcon = document.createElement('i');
    toggleUnitsIcon.className = 'fa-solid fa-temperature-three-quarters sidebar-icon';
    toggleUnitsButton.appendChild(toggleUnitsIcon);
    const toggleUnitsText = document.createElement('span');
    toggleUnitsText.className = 'sidebar-text';
    toggleUnitsText.innerHTML = 'Toggle<br>Units';
    toggleUnitsButton.appendChild(toggleUnitsText);
    toggleUnitsButton.addEventListener('click', onClickToggleUnits);
}