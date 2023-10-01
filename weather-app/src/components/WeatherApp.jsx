import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import GeoDbAutocomplete from "./GeoDbAutocomplete";
import OpenWeather from "./OpenWeather";

function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "16px",
          width: "30vw",
          margin: "0 auto",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Weather App
        </Typography>
        <GeoDbAutocomplete
          onCitySelect={(selectedOption) => setSelectedCity(selectedOption)}
        />
        {selectedCity && (
          <OpenWeather
            selectedCity={selectedCity}
            setError={setError}
            setWeather={setWeather}
            setHourlyForecast={setHourlyForecast}
            setWeeklyForecast={setWeeklyForecast}
            setLoadingSuggestions={setLoadingSuggestions}
            setSuggestions={setSuggestions}
          />
        )}
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
        {weather && (
          <div>
            <Typography variant="h5">
              {weather.name}, {weather.sys && weather.sys.country}
            </Typography>
            <Typography variant="body1">
              Temperature:{" "}
              {weather.main.temp ? Math.round(weather.main.temp) : "N/A"}
              °C
            </Typography>
            <Typography variant="body1">
              Weather: {weather.weather[0] ? weather.weather[0].main : "N/A"}
            </Typography>
          </div>
        )}

        {hourlyForecast.length > 0 && (
          <div>
            <Typography variant="h5">2-Hourly Forecast Today</Typography>
            <ul>
              {hourlyForecast.map((forecast) => (
                <li key={forecast.dt}>
                  Time: {new Date(forecast.dt * 1000).toLocaleTimeString()},
                  Temperature: {Math.round(forecast.main.temp)}°C
                </li>
              ))}
            </ul>
          </div>
        )}

        {weeklyForecast.length > 0 && (
          <div>
            <Typography variant="h5">Weekly Forecast</Typography>
            <ul>
              {weeklyForecast.map((forecast) => (
                <li key={forecast.dt}>
                  Date: {new Date(forecast.dt * 1000).toLocaleDateString()},
                  Temperature: {Math.round(forecast.main.temp)}°C
                </li>
              ))}
            </ul>
          </div>
        )}
      </Paper>
    </Box>
  );
}

export default WeatherApp;
