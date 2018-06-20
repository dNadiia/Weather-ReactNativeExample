import Temperature from './Temperature';

export default class Forecast {

    date: Number;
    temperature: Temperature;
    wind: Number;
    humidity: Number;
    precipitation: Number;
    description: String;
    icon: String;

    constructor(date: Number,
                temperature: Temperature,
                wind: Number,
                humidity: Number,
                precipitation: Number,
                description: String,
                icon: String) {
        this.date = date;
        this.temperature = temperature;
        this.wind = wind;
        this.humidity = humidity;
        this.precipitation = precipitation;
        this.description = description;
        this.icon = icon;
    }
}