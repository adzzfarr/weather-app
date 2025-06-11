// index.js
import "./styles.css";
import { getWeatherData } from "./modules/weather-data";
import { renderOverview } from "./components/overview";
import { updateBackground } from "./modules/update-background";
import { renderHourlyForecast } from "./components/hourly-forecast";
import { renderAtmosphericConditions } from "./components/atmospheric-conditions";
import { renderDailyForecast } from "./components/daily-forecast";
import { renderSidebar } from "./components/sidebar";

document.addEventListener('DOMContentLoaded', runApp);

async function runApp() {
    const content = document.getElementById('content');
    const input = document.querySelector('input');
    let unitGroup = 'uk';

    renderSidebar(onClickHome, onClickToggleUnits);

    const search = document.getElementById('search-button');
    search.addEventListener('click', async () => {
        const searchedLocation = input.value.toString().trim();
        if (!searchedLocation) return;

        try {
            const weatherData = await getWeatherData(searchedLocation, unitGroup);
            await renderContent(weatherData);
        } catch (err) {
            console.error("Failed to fetch weather data:", err);
        }
    });

    function onClickHome() {
        content.innerHTML = '';
    }

    async function onClickToggleUnits() {
        unitGroup = unitGroup === 'uk' ? 'us' : 'uk';

        if (content.hasChildNodes()) {
            const searchedLocation = input.value.toString().trim();
            if (!searchedLocation) return;

            try {
                const weatherData = await getWeatherData(searchedLocation, unitGroup);
                await renderContent(weatherData);
            } catch (err) {
                console.error("Failed to fetch weather data:", err);
            }
        }
    }

    async function renderContent(weatherData) {
        content.innerHTML = '';

        const overview = await renderOverview(weatherData);
        content.appendChild(overview);

        const hourlyForecast = await renderHourlyForecast(weatherData);
        content.appendChild(hourlyForecast);

        const atmosphericConditions = await renderAtmosphericConditions(weatherData);
        content.appendChild(atmosphericConditions);

        const dailyForecast = await renderDailyForecast(weatherData);
        content.appendChild(dailyForecast);

        const dateTime = weatherData.currentConditions.datetime;
        const hour = parseInt(dateTime.slice(0, 3));
        const isDaytime = hour >= 6 && hour <= 18; 
        const iconName = weatherData.currentConditions.icon;
        updateBackground(iconName, isDaytime);  

        overview.className = (!isDaytime || iconName.includes('rain') || iconName.includes('thunder')) 
            ? 'text-light' 
            : 'text-dark';
    }
}