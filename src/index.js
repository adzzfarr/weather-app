// index.js
import "./styles.css";
import { getWeatherData } from "./modules/weather-data";
import { renderOverview } from "./components/overview";
import { updateBackground } from "./modules/update-background";
import { renderHourlyForecast } from "./components/hourly-forecast";
import { renderAtmosphericConditions } from "./components/atmospheric-conditions";

const content = document.getElementById('content');
const input = document.querySelector('input');

const search = document.getElementById('search-button');
search.addEventListener('click', async () => {
    content.innerHTML = '';

    const searchQuery = input.value.toString().trim();

    const weatherData = await getWeatherData(searchQuery);
    console.log(weatherData);

    const overview = await renderOverview(searchQuery);
    content.appendChild(overview);

    const hourlyForecast = await renderHourlyForecast(searchQuery);
    content.appendChild(hourlyForecast);

    const atmosphericConditions = await renderAtmosphericConditions(searchQuery);
    content.appendChild(atmosphericConditions);

    const dateTime = weatherData.currentConditions.datetime;
    const hour = parseInt(dateTime.slice(0, 3));
    const isDaytime = hour >= 6 && hour <= 18; 
    const iconName = weatherData.currentConditions.icon;
    updateBackground(iconName, isDaytime);  

    if (!isDaytime || weatherData.currentConditions.icon.includes('rain') || weatherData.currentConditions.icon.includes('thunder')) {
        overview.className = 'text-light';
    } else {
        overview.className = 'text-dark';
    }
});