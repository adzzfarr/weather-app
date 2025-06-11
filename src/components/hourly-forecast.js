// hourly-forecast.js 

export async function renderHourlyForecast(weatherData) {
    try {
        const dailyData = weatherData.days;
        const todayData = dailyData[0];
        const hourlyData = todayData.hours;
        
        const now = new Date();
        let currentHour = now.getHours();

        const hourlyForecastDiv = document.createElement('div');
        hourlyForecastDiv.id = 'hourly-forecast';

        const hourlyForecastText = document.createElement('span');
        hourlyForecastText.id = 'hourly-forecast-title';
        hourlyForecastText.textContent = 'Hourly Forecast';
        hourlyForecastDiv.appendChild(hourlyForecastText)

        let count = 0
        const hourlyForecastTilesDiv = document.createElement('div');
        hourlyForecastTilesDiv.id = 'hourly-tiles';

        while (count < 6) {
            currentHour = currentHour % 24;

            const hourData = hourlyData[currentHour];
            const twoDigitCurrentHour = String(currentHour).padStart(2, '0');
            const temp = hourData.temp;
            const iconName = hourData.icon;

            const hourInfo = document.createElement('div');
            hourInfo.className = 'hour-info';

            const hourText = document.createElement('span');
            hourText.className = 'hour-text';
            hourText.textContent = twoDigitCurrentHour + ':00';
            hourInfo.appendChild(hourText);

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
            hourInfo.appendChild(iconDiv);

            const hourTemp = document.createElement('span');
            hourTemp.className = 'hour-temp';
            hourTemp.textContent = Math.round(temp) + '°';
            hourInfo.appendChild(hourTemp);

            hourlyForecastTilesDiv.appendChild(hourInfo);

            if (count < 5) {
                const divider = document.createElement('div');
                divider.className = 'vertical-divider';
                hourlyForecastTilesDiv.appendChild(divider);
            }

            currentHour++;
            count++;
        }

        hourlyForecastDiv.appendChild(hourlyForecastTilesDiv)

        return hourlyForecastDiv;
    } catch (error) {
        // Error Display
        console.log(error);
    }
}