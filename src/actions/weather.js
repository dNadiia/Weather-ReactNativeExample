import {
    GET_WEATHER_SUCCESSFUL,
    GET_WEATHER_FAILURE
} from '../actionTypes/weather';
import {
    createAction
} from './helper';
import Location from '../models/Location';
import Forecast from '../models/Forecast';
import Temperature from '../models/Temperature';

function parseResponse(response) : Weather {
    var forecast: [Forecast] = [];
    const json = response;
    json.forecast.forecastday.map((object, index) => {
        const date = object.date;
        const day = object.day;
        const wind = day.maxwind_kph;
        const humidity = day.avghumidity;
        const precipitation = day.totalprecip_in;
        const description = day.condition.text;
        const icon = day.condition.icon;
        const temperature = new Temperature(day.mintemp_c, day.maxtemp_c, day.avgtemp_c);
        forecast.push(new Forecast(date, temperature, wind, humidity, precipitation, description, icon));
    });

    const name = response.location.name;
    const country = response.location.country;
    const lat = response.location.lat;
    const lon = response.location.lon;
    const location = new Location(name, country, lat, lon);

    return {location, forecast};
}


export function actionGetWeather(q: String) {
    return (dispatch) => {
        const url = 'http://api.apixu.com/v1/forecast.json?key=54ed6bf8553947bc82d141340181506&q='+q+'&days=7';
        return fetch(url, {method: 'GET'})
            .then((response) => response.json())
            .then(parseResponse)
            .then((payload) => {
                dispatch(createAction(GET_WEATHER_SUCCESSFUL, payload));
            })
            .catch((e) => {
                dispatch(createAction(GET_WEATHER_FAILURE));
            });
    };
}