// overview.js

export async function renderOverview(weatherData) {
    try {
        const currentConditions = weatherData.currentConditions;

        const overviewDiv = document.createElement('div');
        overviewDiv.id = 'overview';
        overviewDiv.className = '';

        const textDiv = document.createElement('div');
        textDiv.id = 'overview-text';

        const locationDiv = document.createElement('div');
        locationDiv.id = 'location-text';
        const resolvedAddress = weatherData.resolvedAddress;
        locationDiv.textContent = resolvedAddress;
        textDiv.appendChild(locationDiv);

        const conditionsDiv = document.createElement('div');
        conditionsDiv.id = 'conditions-text'
        conditionsDiv.textContent = currentConditions.conditions;
        textDiv.appendChild(conditionsDiv);

        const temperatures = document.createElement('div');
        temperatures.id = 'temperatures-text';
        const temp = document.createElement('span');
        temp.textContent = Math.round(currentConditions.temp) + '°';
        const feelsLike = document.createElement('span');
        feelsLike.textContent = 'Feels like ' + Math.round(currentConditions.feelslike) + '°';
        temperatures.appendChild(temp);
        temperatures.appendChild(feelsLike);
        textDiv.appendChild(temperatures);

        const iconDiv = document.createElement('div');
        iconDiv.classList.add('icon-large');
        const iconName = currentConditions.icon;
        const icon = document.createElement('img');
        try {    
            const iconPath = await import(`../assets/icons-svg/${iconName}.svg`);
            icon.src = iconPath.default;
        } catch (error) {
            console.log(`Error: ${iconName} icon not found`);
            console.log(error);
        }
        iconDiv.appendChild(icon);  
        
        overviewDiv.appendChild(textDiv);   
        overviewDiv.appendChild(iconDiv);

        return overviewDiv;
    } catch (error) {
        // Error Display
        console.log(error);
    }
}