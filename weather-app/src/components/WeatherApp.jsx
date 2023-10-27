import React, { useState } from "react";
import "./WeatherApp.css";
import { Box, Typography } from "@mui/material";
import GeoDbAutocomplete from "./GeoDbAutocomplete";
import Geolocation from "./Geolocation";
import OpenWeather from "./OpenWeather";
import ForecastBasic from "./ForecastBasic";
import ForecastThreeHourly from "./ForecastThreeHourly";
import ForecastWeekly from "./ForecastWeekly";
import ForecastDetails from "./ForecastDetails";

function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState({
    label: "Budapest",
    value: "Budapest",
  });
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [error, setError] = useState(null);
  const [sunsetTime, setSunsetTime] = useState("");
  const [sunriseTime, setSunriseTime] = useState("");

  return (
    <Box className="weather-app">
      <Geolocation setSelectedCity={setSelectedCity} setError={setError} />
      <GeoDbAutocomplete
        onCitySelect={(selectedOption) => setSelectedCity(selectedOption)}
      />
      <div className="forecasts">
        <div className="forecast-day">
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
            <ForecastBasic
              weather={weather}
              sunsetTime={sunsetTime}
              setSunsetTime={setSunsetTime}
              sunriseTime={sunriseTime}
              setSunriseTime={setSunriseTime}
            />
          )}
          {hourlyForecast.length > 0 && (
            <ForecastThreeHourly
              weather={weather}
              hourlyForecast={hourlyForecast}
              sunsetTime={sunsetTime}
              setSunsetTime={setSunsetTime}
              sunriseTime={sunriseTime}
              setSunriseTime={setSunriseTime}
            />
          )}
          {weather && <ForecastDetails weather={weather} />}
        </div>
        <div className="forecast-week">
          {weeklyForecast.length > 0 && (
            <ForecastWeekly weeklyForecast={weeklyForecast} />
          )}
        </div>
      </div>
    </Box>
  );
}

export default WeatherApp;
