export default class Location {
    city: String;
    country: String;
    lat: Number;
    lon: Number;

    constructor(city: String, country: String, lat: Number, lon: Number) {
        this.city = city;
        this.country = country;
        this.lat = lat;
        this.lon = lon;
    }
}