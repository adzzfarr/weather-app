// index.js
import "./styles.css";
import { getWeatherData } from "./modules/weather-data";
import { renderOverview } from "./components/overview";
import { updateBackground } from "./modules/update-background";
import { renderHourlyForecast } from "./components/hourly-forecast";
import { renderAtmosphericConditions } from "./components/atmospheric-conditions";
import { renderDailyForecast } from "./components/daily-forecast";
import { renderSidebar } from "./components/sidebar";
import { showPopUp } from "./components/pop-up";

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

    input.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            const searchedLocation = input.value.trim();
            if (!searchedLocation) return;
            input.blur();
            const weatherData = await getWeatherData(searchedLocation, unitGroup);
            await renderContent(weatherData);
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

        let popUpMessage;
        if (unitGroup === 'uk') {
            popUpMessage = 'Data will be shown in imperial units.';
        } else {
            popUpMessage = 'Data will be shown in metric units.';
        }
        showPopUp(popUpMessage, 3000);
    }

    async function renderContent(weatherData) {
        // Remove any old search content
        removeWeatherComponents();

        // Loading spinner
        let loadingSpinner = document.getElementById('loading-spinner');
        if (!loadingSpinner) {
            loadingSpinner = document.createElement('div');
            loadingSpinner.id = 'loading-spinner';
            content.appendChild(loadingSpinner);
        }
        loadingSpinner.style.display = 'block';

        try {   
            const overview = await renderOverview(weatherData);
            overview.classList.add('fade-in');
            overview.style.animationDelay = '0.1s';
            content.appendChild(overview);

            const hourlyForecast = await renderHourlyForecast(weatherData);
            hourlyForecast.classList.add('fade-in');
            hourlyForecast.style.animationDelay = '0.3s';
            content.appendChild(hourlyForecast);

            const atmosphericConditions = renderAtmosphericConditions(weatherData, unitGroup);
            atmosphericConditions.classList.add('fade-in');
            atmosphericConditions.style.animationDelay = '0.6s';
            content.appendChild(atmosphericConditions);

            const dailyForecast = await renderDailyForecast(weatherData);
            dailyForecast.classList.add('fade-in');
            dailyForecast.style.animationDelay = '0.9s';
            content.appendChild(dailyForecast);

            const dateTime = weatherData.currentConditions.datetime;
            const hour = parseInt(dateTime.slice(0, 3));
            const isDaytime = hour >= 6 && hour <= 18; 
            const iconName = weatherData.currentConditions.icon;
            updateBackground(iconName, isDaytime);  

            overview.className = (!isDaytime || iconName.includes('rain') || iconName.includes('thunder')) 
                ? 'text-light' 
                : 'text-dark';
        } catch (error) {
            // Error display
            console.log(error);
        } finally {
            loadingSpinner.remove();
        }
    }

    function removeWeatherComponents() {
        const overview = document.getElementById('overview');
        if (overview) overview.remove();

        const hourlyForecast = document.getElementById('hourly-forecast');
        if (hourlyForecast) hourlyForecast.remove();

        const atmosphericConditions = document.getElementById('atmospheric-conditions');
        if (atmosphericConditions) atmosphericConditions.remove();

        const dailyForecast = document.getElementById('daily-forecast');
        if (dailyForecast) dailyForecast.remove()
    } 
}