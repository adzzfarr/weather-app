
// daily-forecast.js

export async function renderDailyForecast(weatherData) {
    try {
        const dailyData = weatherData.days;

        const dailyForecastDiv = document.createElement('div');
        dailyForecastDiv.id = 'daily-forecast';

        const dailyForecastText = document.createElement('span');
        dailyForecastText.id = 'daily-forecast-title';
        dailyForecastText.textContent = '7-Day Forecast';
        dailyForecastDiv.appendChild(dailyForecastText)

        const dailyForecastTilesDiv = document.createElement('div');
        dailyForecastTilesDiv.id = 'daily-tiles';
    
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        for (let i = 0; i < 7; i++) {
            const dayData = dailyData[i];
            const date = new Date(dayData.datetime);
            const iconName = dayData.icon;
            const tempMax = dayData.tempmax;
            const tempMin = dayData.tempmin;

            const dayInfo = document.createElement('div');
            dayInfo.className = 'day-info';

            const dayText = document.createElement('span');
            dayText.className = 'day-text';
            dayText.textContent = weekdays[date.getDay()];
            dayInfo.appendChild(dayText);

            const iconDiv = document.createElement('div');
            iconDiv.classList.add('icon-small');
            const icon = document.createElement('img');
            try {    
                const iconPath = await import(`../assets/icons-svg/${iconName}.svg`);
                icon.src = iconPath.default;
            } catch (error) {
                console.log(`Error: ${iconName} icon not found`);
                console.log(error);
            }
            iconDiv.appendChild(icon);
            dayInfo.appendChild(iconDiv);

            const dayTemps = document.createElement('div');
            dayTemps.className = 'day-temps';
            dayTemps.textContent = Math.round(tempMax) + '°/' + Math.round(tempMin) + '°';
            dayInfo.appendChild(dayTemps);

            dailyForecastTilesDiv.appendChild(dayInfo);

            if (i < 6) {
                const divider = document.createElement('div');
                divider.className = 'horizontal-divider';
                dailyForecastTilesDiv.appendChild(divider);
            }
        }

        dailyForecastDiv.appendChild(dailyForecastTilesDiv)

        return dailyForecastDiv;
    } catch (error) {
        // Error Display
        console.log(error);
    }
}