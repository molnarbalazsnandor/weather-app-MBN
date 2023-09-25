import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useDebounce } from "./useDebounce";
import GeoApify from "./GeoApify";

const API_KEY = "d163b4fb3ccea3df7eff1ce2046ec130";
const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather`;
const HOURLY_WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast`;
const SUGGESTION_API_URL = `https://api.openweathermap.org/data/2.5/find`;

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const debouncedCity = useDebounce(city, 300);

  useEffect(() => {
    if (debouncedCity) {
      fetchWeather();
    }
  }, [debouncedCity]);

  const fetchWeather = async () => {
    try {
      setError(null);

      // Fetch current weather data
      const currentWeatherResponse = await fetch(
        `${CURRENT_WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric` // Use metric units for Celsius
      );
      const currentWeatherData = await currentWeatherResponse.json();

      if (currentWeatherData.main) {
        setWeather(currentWeatherData);

        // Fetch hourly weather forecast data
        const hourlyForecastResponse = await fetch(
          `${HOURLY_WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric` // Use metric units for Celsius
        );
        const hourlyForecastData = await hourlyForecastResponse.json();

        if (hourlyForecastData.list) {
          // Filter hourly data for the current day
          const currentDate = new Date();
          const currentDay = currentDate.getDate();
          const filteredHourlyForecast = hourlyForecastData.list.filter(
            (forecast) => {
              const forecastDate = new Date(forecast.dt * 1000);
              return forecastDate.getDate() === currentDay;
            }
          );

          // Extract 2-hourly data from the filtered list
          const twoHourlyForecast = filteredHourlyForecast.filter(
            (forecast, index) => index % 2 === 0
          );

          setHourlyForecast(twoHourlyForecast);

          // Fetch weekly weather forecast data
          const weeklyForecast = hourlyForecastData.list.filter((forecast) =>
            forecast.dt_txt.includes("12:00:00")
          ); // Assuming 12:00:00 represents the daily forecast
          setWeeklyForecast(weeklyForecast);
        } else {
          setError("Hourly forecast data not found");
        }
      } else {
        setError("Weather data not found");
      }
    } catch (error) {
      setError("Error fetching weather");
      console.error("Error fetching weather:", error);
    }
  };

  const fetchSuggestions = async (inputValue) => {
    try {
      setLoadingSuggestions(true);
      const response = await fetch(
        `${SUGGESTION_API_URL}?q=${inputValue}&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.list) {
        const cityNames = data.list.map((item) => item.name);
        setSuggestions(cityNames.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      setSuggestions([]);
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

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
        <GeoApify
          onInputChange={(event, newInputValue) => {
            setCity(newInputValue);
            if (newInputValue) {
              fetchSuggestions(newInputValue);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter city name"
              variant="outlined"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingSuggestions ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <Autocomplete
          id="city-autocomplete"
          options={suggestions}
          loading={loadingSuggestions}
          onInputChange={(event, newInputValue) => {
            setCity(newInputValue);
            if (newInputValue) {
              fetchSuggestions(newInputValue);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter city name"
              variant="outlined"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingSuggestions ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
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
