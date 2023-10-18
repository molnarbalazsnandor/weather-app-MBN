import React, { useState } from "react";
import "./WeatherApp.css";
import { Box, Typography } from "@mui/material";
import GeoDbAutocomplete from "./GeoDbAutocomplete";
import Geolocation from "./Geolocation";
import OpenWeather from "./OpenWeather";
import ForecastToday from "./ForecastToday";
import ForecastTwoHourly from "./ForecastTwoHourly";
import ForecastWeekly from "./ForecastWeekly";

function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [error, setError] = useState(null);

  return (
    <Box className="weather-app">
      <GeoDbAutocomplete
        onCitySelect={(selectedOption) => setSelectedCity(selectedOption)}
      />{" "}
      <Geolocation setSelectedCity={setSelectedCity} setError={setError} />
      {selectedCity && (
        <OpenWeather
          selectedCity={selectedCity}
          setError={setError}
          setWeather={setWeather}
          setHourlyForecast={setHourlyForecast}
          setWeeklyForecast={setWeeklyForecast}
        />
      )}
      {weather && (
        <ForecastToday className="forecast-today" weather={weather} />
      )}
      {hourlyForecast.length > 0 && (
        <ForecastTwoHourly
          className="forecast-two-hourly"
          hourlyForecast={hourlyForecast}
        />
      )}
      {weeklyForecast.length > 0 && (
        <ForecastWeekly
          className="forecast-weekly"
          weeklyForecast={weeklyForecast}
        />
      )}
    </Box>
  );
}

export default WeatherApp;
