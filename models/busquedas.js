const axios = require("axios");

class Busquedas {
  historial = ["Lima", "Madrid", "Caracas"];

  constructor() {}
  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      language: "es",
      /*  limit: 5, */
    };
  }
  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }
  async ciudad(lugar = "") {
    try {
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });
      const resp = await intance.get();
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }
  async climaLugar(lat = "", lon = "") {
    try {
      //intance axios.create();
      const intance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },
      });
      // resp.data
      const resp = await intance.get();
      const { weather, main } = resp.data;
      return {
        temp: main.temp,
        min: main.temp_min,
        max: main.temp_max,
        des: weather[0].description,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Busquedas;
