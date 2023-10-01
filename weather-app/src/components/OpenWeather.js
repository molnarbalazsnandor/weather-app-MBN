import { useEffect } from "react";
import {
  WEATHER_API_KEY,
  CURRENT_WEATHER_URL,
  HOURLY_WEATHER_URL,
  SUGGESTION_API_URL,
} from "../api";

const fetchWeather = async (
  selectedCity,
  setError,
  setWeather,
  setHourlyForecast,
  setWeeklyForecast
) => {
  if (!selectedCity) return;
  try {
    setError(null);

    // Fetch current weather data based on the selected city
    const currentWeatherResponse = await fetch(
      `${CURRENT_WEATHER_URL}?q=${selectedCity.label}&appid=${WEATHER_API_KEY}&units=metric` // Use metric units for Celsius
    );
    const currentWeatherData = await currentWeatherResponse.json();

    if (currentWeatherData.main) {
      setWeather(currentWeatherData);

      // Fetch hourly weather forecast data based on the selected city
      const hourlyForecastResponse = await fetch(
        `${HOURLY_WEATHER_URL}?q=${selectedCity.label}&appid=${WEATHER_API_KEY}&units=metric` // Use metric units for Celsius
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

        // Fetch weekly weather forecast data based on the selected city
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

const fetchSuggestions = async (
  inputValue,
  setLoadingSuggestions,
  setSuggestions
) => {
  try {
    setLoadingSuggestions(true);
    const response = await fetch(
      `${SUGGESTION_API_URL}?q=${inputValue}&appid=${WEATHER_API_KEY}`
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

const OpenWeather = ({
  selectedCity,
  setError,
  setWeather,
  setHourlyForecast,
  setWeeklyForecast,
  setLoadingSuggestions,
  setSuggestions,
}) => {
  useEffect(() => {
    fetchWeather(
      selectedCity,
      setError,
      setWeather,
      setHourlyForecast,
      setWeeklyForecast
    );
    fetchSuggestions(selectedCity.label, setLoadingSuggestions, setSuggestions);
  }, [selectedCity]);

  return null;
};

export default OpenWeather;
