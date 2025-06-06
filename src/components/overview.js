// overview.js
import { getWeatherData } from "../modules/weather-data";

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

        const iconDiv = document.createElement('div');
        iconDiv.classList.add('icon-large');
        const iconName = currentConditions.icon;
        const icon = document.createElement('img');
        try {    
            const iconPath = await import(`../assets/weather-icons/${iconName}.png`);
            icon.src = iconPath.default;
        } catch (error) {
            console.log(`Error: ${iconName} icon not found`);
            console.log(error);
        }
        iconDiv.appendChild(icon);

        
        overviewDiv.appendChild(locationDiv);
        overviewDiv.appendChild(weatherConditions);
        overviewDiv.appendChild(iconDiv);

        return overviewDiv;
    } catch (error) {
        // Error Display
        console.log(error);
    }
}