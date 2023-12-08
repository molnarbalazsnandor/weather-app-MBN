import React, { useState } from "react";
import "./WeatherApp.css";
import { Box, Typography } from "@mui/material";
import GeoDbAutocomplete from "./GeoDbAutocomplete";
import Geolocation from "./Geolocation";
import FetchWeather from "./FetchWeather";
import ForecastBasic from "./ForecastBasic";
import ForecastThreeHourly from "./ForecastThreeHourly";
import ForecastWeekly from "./ForecastWeekly";
import ForecastDetails from "./ForecastDetails";
import ParticlesBackground from "./ParticlesBackground";

function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState({
    label: "Budapest",
    value: "Budapest",
  });
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [error, setError] = useState(null);

  return (
    <Box className="weather-app">
      <ParticlesBackground />

      <Geolocation setSelectedCity={setSelectedCity} />
      <GeoDbAutocomplete
        onCitySelect={(selectedOption) => setSelectedCity(selectedOption)}
      />
      <Box className="forecasts">
        <Box className="forecast-day">
          {selectedCity && (
            <FetchWeather
              selectedCity={selectedCity}
              setError={setError}
              weather={weather}
              setWeather={setWeather}
              setHourlyForecast={setHourlyForecast}
              setWeeklyForecast={setWeeklyForecast}
            />
          )}
          {weather && <ForecastBasic weather={weather} />}
          {hourlyForecast.length > 0 && (
            <ForecastThreeHourly
              weather={weather}
              hourlyForecast={hourlyForecast}
            />
          )}
          {weather && <ForecastDetails weather={weather} />}
        </Box>
        <Box className="forecast-week">
          {weeklyForecast.length > 0 && (
            <ForecastWeekly weeklyForecast={weeklyForecast} />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default WeatherApp;
