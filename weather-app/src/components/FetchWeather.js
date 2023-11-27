import { useEffect } from "react";
import {
  WEATHER_API_KEY,
  CURRENT_WEATHER_URL,
  HOURLY_WEATHER_URL,
} from "../api";
import { useWeatherContext } from "./../WeatherContext";

const fetchWeatherData = async (
  selectedCity,
  setError,
  setWeather,
  setHourlyForecast,
  setWeeklyForecast,
  dispatch
) => {
  if (!selectedCity) return;
  try {
    setError(null);

    // Fetch current weather data based on the selected city
    const currentWeatherResponse = await fetch(
      `${CURRENT_WEATHER_URL}?q=${selectedCity.label}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const currentWeatherData = await currentWeatherResponse.json();

    if (currentWeatherData) {
      setWeather(currentWeatherData);

      //Calculate current, sunset and sunrise times and set Context
      const currentTimestamp = Math.floor(
        (Date.now() + currentWeatherData.timezone * 1000) / 1000
      );
      const sunsetTimestamp =
        currentWeatherData.sys.sunset + currentWeatherData.timezone;
      const sunriseTimestamp =
        currentWeatherData.sys.sunrise + currentWeatherData.timezone;

      dispatch({
        type: "SET_CURRENT_TIME",
        payload: currentTimestamp,
      });

      dispatch({
        type: "SET_SUNSET_TIME",
        payload: sunsetTimestamp,
      });

      dispatch({
        type: "SET_SUNRISE_TIME",
        payload: sunriseTimestamp,
      });

      dispatch({
        type: "SET_TIMEZONE",
        payload: currentWeatherData.timezone,
      });

      // Fetch hourly weather forecast data based on the selected city
      const hourlyForecastResponse = await fetch(
        `${HOURLY_WEATHER_URL}?q=${selectedCity.label}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const hourlyForecastData = await hourlyForecastResponse.json();

      if (hourlyForecastData.list) {
        setHourlyForecast(hourlyForecastData.list);

        // Calculate weekly weather forecast from the hourly datas

        const modifiedHourlyForecast = hourlyForecastData.list.map(
          (hourlyData) => {
            const { dt } = hourlyData;
            const timezone = currentWeatherData.timezone;

            // Convert UNIX timestamp to actual time in the location
            const date = new Date((dt + timezone) * 1000);

            // Format the date to YYYY-MM-DD HH:mm
            const formattedTime = date.toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: "UTC",
            });

            const dayOfWeek = date.getDay();

            const daysOfWeek = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];

            const dayName = daysOfWeek[dayOfWeek];

            // Update the object with the modified dt, dt_txt, and dayOfWeek keys
            return {
              ...hourlyData,
              dt: dt + timezone,
              dt_txt: formattedTime,
              dayOfWeek: dayName,
            };
          }
        );
        const groupedByDay = {};

        modifiedHourlyForecast.forEach((hourlyData) => {
          const { dayOfWeek } = hourlyData;

          if (!groupedByDay[dayOfWeek]) {
            groupedByDay[dayOfWeek] = [];
          }

          groupedByDay[dayOfWeek].push(hourlyData);
        });

        const dailyForecast = [];

        Object.keys(groupedByDay).forEach((dayOfWeek) => {
          const dayData = groupedByDay[dayOfWeek];

          const temperatures = dayData.map((data) => data.main.temp);
          const temp_min = Math.min(...temperatures);
          const temp_max = Math.max(...temperatures);

          // Calculate the most frequent weather description
          const weatherDescriptions = dayData.map(
            (data) => data.weather[0].description
          );
          const mostFrequentWeather = mode(weatherDescriptions);

          const averageHumidity =
            dayData.reduce((sum, data) => sum + data.main.humidity, 0) /
            dayData.length;

          const averageWindSpeed =
            dayData.reduce((sum, data) => sum + data.wind.speed, 0) /
            dayData.length;

          // Create the daily forecast object
          const dailyForecastItem = {
            dayOfWeek,
            temp_min,
            temp_max,
            weather: mostFrequentWeather,
            humidity: averageHumidity,
            wind_speed: averageWindSpeed,
          };

          dailyForecast.push(dailyForecastItem);
        });

        // Function to find the mode (most frequent element) in an array
        function mode(arr) {
          return arr.reduce(
            (acc, val, i, arr) =>
              arr.filter((v) => v === val).length > acc.max
                ? { value: val, max: arr.filter((v) => v === val).length }
                : acc,
            { value: null, max: 0 }
          ).value;
        }

        setWeeklyForecast(modifiedHourlyForecast);

        // Log the data after successful fetch
        console.log(selectedCity.label);
        console.log("Weather Data:", currentWeatherData);
        console.log("Hourly Forecast Data:", hourlyForecastData.list);
        console.log("5-day Forecast Data:", dailyForecast);
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

// Format the UNIX time data in HH:mm format
export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: false,
  });
};

// Format the UNIX time data in HH:mm format, when the timezone is not already included
export const formatTimeWithTimeZone = (timestamp, timezone) => {
  const localTime = new Date(timestamp * 1000);
  const offset = localTime.getTimezoneOffset();
  const adjustedTime = new Date(
    localTime.getTime() + offset * 60 * 1000 + timezone * 1000
  );

  return adjustedTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const FetchWeather = ({
  selectedCity,
  setError,
  setWeather,
  setHourlyForecast,
  setWeeklyForecast,
  setLoadingSuggestions,
  setSuggestions,
}) => {
  const { dispatch } = useWeatherContext();

  useEffect(() => {
    fetchWeatherData(
      selectedCity,
      setError,
      setWeather,
      setHourlyForecast,
      setWeeklyForecast,
      dispatch
    );
  }, [selectedCity, dispatch]);

  return null;
};

export default FetchWeather;
