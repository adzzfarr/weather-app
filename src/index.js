// index.js
import "./styles.css";
import { getWeatherData } from "./weather-data";
import { renderOverview } from "./modules/overview";

const content = document.getElementById('content');
const input = document.querySelector('input');

const search = document.getElementById('search-button');
search.addEventListener('click', async () => {
    const searchQuery = input.value.toString().trim();
    console.log(await getWeatherData(searchQuery));
    const overview = await renderOverview(searchQuery);
    content.appendChild(overview);
});