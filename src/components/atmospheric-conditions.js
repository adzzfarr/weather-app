// atmospheric-conditions.js
export function renderAtmosphericConditions(weatherData, unitGroup) {
    try {
        const currentConditions = weatherData.currentConditions;

        const atmosphericConditionsDiv = document.createElement('div');
        atmosphericConditionsDiv.id = 'atmospheric-conditions';

        const atmosphericConditionsText = document.createElement('span');
        atmosphericConditionsText.id = 'atmospheric-conditions-title';
        atmosphericConditionsText.textContent = 'Atmospheric Conditions';
        atmosphericConditionsDiv.appendChild(atmosphericConditionsText);

        const atmosphericConditionsGrid = document.createElement('div');
        atmosphericConditionsGrid.id = 'atmospheric-conditions-grid';

        const conditions = ['humidity', 'precipprob', 'windspeed', 'uvindex'];

        for (let condition of conditions) {;
            const conditionData = currentConditions[condition];

            const conditionDiv = document.createElement('div');
            conditionDiv.id = condition;

            const conditionHeader = document.createElement('div');
            conditionHeader.className = 'atmospheric-condition-header';

            const conditionIcon = document.createElement('i');
            conditionIcon.className = 'fa-solid atmospheric-condition-icon';
            if (condition === 'humidity') {
                conditionIcon.classList.add('fa-droplet');
            } else if (condition === 'precipprob') {
                conditionIcon.classList.add('fa-umbrella');
            } else if (condition === 'windspeed' ) {
                conditionIcon.classList.add('fa-wind');
            } else if (condition === 'uvindex') {
                conditionIcon.classList.add('fa-sun');
            }
            conditionHeader.appendChild(conditionIcon);

            const conditionText = document.createElement('span');
            conditionText.className = 'atmospheric-condition-title';
            if (condition === 'humidity') {
                conditionText.textContent = 'Relative Humidity';
            } else if (condition === 'precipprob') {
                conditionText.textContent = 'Chance of Rain';
            } else if (condition === 'windspeed' ) {
                conditionText.textContent = 'Wind Speed';
            } else if (condition === 'uvindex') {
                conditionText.textContent = 'UV Index';
            }
            conditionHeader.appendChild(conditionText);

            conditionDiv.appendChild(conditionHeader);

            const conditionValue = document.createElement('div');
            conditionValue.className = 'atmospheric-condition-value';
            if (condition === 'humidity' || condition === 'precipprob') {
                conditionValue.textContent = conditionData + '%';
            } else if (condition === 'windspeed' ) {
                const speedUnit = unitGroup === 'uk' ? 'km/h' : 'mph'
                conditionValue.textContent = conditionData + ' ' + speedUnit;
            } else if (condition === 'uvindex') {
                conditionValue.textContent = conditionData;
            }
            conditionDiv.appendChild(conditionValue);
            atmosphericConditionsGrid.appendChild(conditionDiv);
        }

        atmosphericConditionsDiv.appendChild(atmosphericConditionsGrid);
        return atmosphericConditionsDiv;
    } catch (error) {
        console.log(error);
    }
}