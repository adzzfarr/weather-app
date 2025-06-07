// index.js
import "./styles.css";
import { getWeatherData } from "./modules/weather-data";
import { renderOverview } from "./components/overview";
import { updateBackground } from "./modules/update-background";

const content = document.getElementById('content');
const input = document.querySelector('input');

const search = document.getElementById('search-button');
search.addEventListener('click', async () => {
    const searchQuery = input.value.toString().trim();

    const weatherData = await getWeatherData(searchQuery);
    console.log(weatherData);

    const overview = await renderOverview(searchQuery);
    content.innerHTML = '';
    content.appendChild(overview);

    const dateTime = weatherData.currentConditions.datetime;
    const hour = parseInt(dateTime.slice(0, 3));
    const isDaytime = hour >= 6 && hour <= 18; 
    const iconName = weatherData.currentConditions.icon;
    updateBackground(iconName, isDaytime);  

    if (isDaytime) {
        overview.className = 'text-dark';
    } else {
        overview.className = 'text-light';
    }
});