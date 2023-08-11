import React, { useState, useEffect } from "react";

const API_KEY = "d163b4fb3ccea3df7eff1ce2046ec130";
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {weather && (
        <div className="weather-info">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>
            Temperature:{" "}
            {weather.main.temp ? Math.round(weather.main.temp - 273.15) : "N/A"}
            °C
          </p>
          <p>Weather: {weather.weather[0] ? weather.weather[0].main : "N/A"}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
