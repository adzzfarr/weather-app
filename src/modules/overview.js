// overview.js
import { getWeatherData } from "../weather-data";

export async function renderOverview(searchedLocation) {
    try {
        const weatherData = await getWeatherData(searchedLocation);
        const currentConditions = weatherData.currentConditions;

        const overviewDiv = document.createElement('div');
        overviewDiv.id = 'overview';

        const locationDiv = document.createElement('div');
        locationDiv.id = 'location';
        const resolvedAddress = weatherData.resolvedAddress;
        locationDiv.textContent = resolvedAddress;
        overviewDiv.appendChild(locationDiv);

        const weatherConditions = document.createElement('div');
        weatherConditions.id = 'conditions';
        const temp = document.createElement('h2');
        temp.textContent = currentConditions.temp;
        const feelsLike = document.createElement('span');
        feelsLike.textContent = currentConditions.feelsLike;
        const conditions = document.createElement('h3');
        conditions.textContent = currentConditions.conditions;
        weatherConditions.appendChild(temp);
        weatherConditions.appendChild(feelsLike);
        weatherConditions.appendChild(conditions);
        overviewDiv.appendChild(weatherConditions);

        const iconDiv = document.createElement('div');
        iconDiv.classList.add('icon-large');
        const iconName = currentConditions.icon;
        const icon = document.createElement('img');
        icon.src = getIconPath(iconName);
        iconDiv.appendChild(icon);
        overviewDiv.appendChild(iconDiv);

        return overviewDiv;
    } catch (error) {
        // Error Display
        console.log(error);
    }
}

function getIconPath(iconName) {
    const icons = require.context('../assets/weather-icons', false, /\.png$/);
    const iconPath = icons(`./${iconName}.png`);
    return iconPath;
}