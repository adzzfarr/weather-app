// weather-data.js
export async function getWeatherData(location, unitGroup) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=ENJGYKEUH4VS3CVK8RK59CNQP&unitGroup=${unitGroup}`, {mode: 'cors'});

        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw(error);
    }
}