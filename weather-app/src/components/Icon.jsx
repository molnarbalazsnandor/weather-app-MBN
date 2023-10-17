import React, { useState, useEffect } from "react";

const weatherIconsDay = {
  "clear sky": require("./../pictures/icons/day/clear sky.svg").ReactComponent,
  "cloudy and rainy": require("./../pictures/icons/day/cloudy and rainy.svg")
    .ReactComponent,
  cloudy: require("./../pictures/icons/day/cloudy.svg").ReactComponent,
  "heavyrain and storm":
    require("./../pictures/icons/day/heavyrain and storm.svg").ReactComponent,
  rain: require("./../pictures/icons/day/rain.svg").ReactComponent,
  snow: require("./../pictures/icons/day/snow.svg").ReactComponent,
  "sunny-1": require("./../pictures/icons/day/sunny-1.svg").ReactComponent,
  "sunny-2": require("./../pictures/icons/day/sunny-2.svg").ReactComponent,
  thunder: require("./../pictures/icons/day/thunder.svg").ReactComponent,
};

const weatherIconsNight = {
  "clear sky": require("./../pictures/icons/night/clear sky.svg")
    .ReactComponent,
  cloudy: require("./../pictures/icons/night/cloudy.svg").ReactComponent,
  "full moon": require("./../pictures/icons/night/full moon.svg")
    .ReactComponent,
  "heavyrain and storm":
    require("./../pictures/icons/night/heavyrain and storm.svg").ReactComponent,
  "night rain": require("./../pictures/icons/night/night rain.svg")
    .ReactComponent,
  night: require("./../pictures/icons/night/night.svg").ReactComponent,
  rain: require("./../pictures/icons/night/rain.svg").ReactComponent,
  snow: require("./../pictures/icons/night/snow.svg").ReactComponent,
  thunder: require("./../pictures/icons/night/thunder.svg").ReactComponent,
};

const Icon = ({ weather }) => {
  const [isDay, setIsDay] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [sunsetTime, setSunsetTime] = useState("");
  const [sunriseTime, setSunriseTime] = useState("");

  useEffect(() => {
    if (weather) {
      const currentTimestamp = Math.floor(
        (Date.now() + weather.timezone * 1000) / 1000
      ); // Current time in Unix timestamp
      const sunriseTimestamp = weather.sys.sunrise + weather.timezone;
      const sunsetTimestamp = weather.sys.sunset + weather.timezone;

      // Create Date objects from the timestamps
      const currentDate = new Date(currentTimestamp * 1000);
      const sunriseDate = new Date(sunriseTimestamp * 1000);
      const sunsetDate = new Date(sunsetTimestamp * 1000);

      // Format the dates as hours and minutes
      const currentTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        hour12: false,
      });
      const sunriseTime = sunriseDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        hour12: false,
      });
      const sunsetTime = sunsetDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        hour12: false,
      });

      setCurrentTime(currentTime);
      setSunsetTime(sunsetTime);
      setSunriseTime(sunriseTime);

      const calculateIsDay = () => {
        setIsDay(currentTime >= sunsetTime && currentTime < sunriseTime);
      };

      calculateIsDay();
    }
  }, [weather]);

  if (!weather) {
    return null; // Handle the case when weather is null
  }

  console.log(
    `Current Time: ${currentTime}` +
      ` Sunset Time: ${sunsetTime}` +
      ` Sunrise Time: ${sunriseTime}`
  );

  const weatherIcons = isDay ? weatherIconsDay : weatherIconsNight;
  const WeatherIconComponent =
    weatherIcons[weather.weather[0].description.toLowerCase()];

  if (WeatherIconComponent) {
    return (
      <WeatherIconComponent
        style={{
          width: "10vw",
          height: "10vh",
        }}
      />
    );
  } else {
    return null;
  }
};

export default Icon;
