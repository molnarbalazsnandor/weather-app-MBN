import React, { useState, useEffect } from "react";

const weatherIconsDay = {
  "clear sky": require("./../pictures/icons/day/clear sky.svg").ReactComponent,
  "few clouds": require("./../pictures/icons/day/few clouds.svg")
    .ReactComponent,
  "scattered clouds": require("./../pictures/icons/day/scattered clouds.svg")
    .ReactComponent,
  "broken clouds": require("./../pictures/icons/day/scattered clouds.svg")
    .ReactComponent,
  "overcast clouds": require("./../pictures/icons/day/overcast clouds.svg")
    .ReactComponent,
  mist: require("./../pictures/icons/day/mist.svg").ReactComponent,
  fog: require("./../pictures/icons/day/mist.svg").ReactComponent,
  "light rain": require("./../pictures/icons/day/cloudy and rainy.svg")
    .ReactComponent,
  "light intensity drizzle rain":
    require("./../pictures/icons/day/cloudy and rainy.svg").ReactComponent,
  "shower rain": require("./../pictures/icons/day/cloudy and rainy.svg")
    .ReactComponent,
  "moderate rain": require("./../pictures/icons/day/cloudy and rainy.svg")
    .ReactComponent,
  showers: require("./../pictures/icons/day/cloudy and rainy.svg")
    .ReactComponent,
  "heavy rain": require("./../pictures/icons/day/rain.svg").ReactComponent,
  "light snow": require("./../pictures/icons/day/snow.svg").ReactComponent,
  "moderate snow": require("./../pictures/icons/day/snow.svg").ReactComponent,
  "heavy snow": require("./../pictures/icons/day/snow.svg").ReactComponent,
  thunderstorm: require("./../pictures/icons/day/thunder.svg").ReactComponent,
  "thunderstorm with rain":
    require("./../pictures/icons/day/thunderstorm with rain.svg")
      .ReactComponent,
};

const weatherIconsNight = {
  "clear sky": require("./../pictures/icons/night/clear sky.svg")
    .ReactComponent,
  "few clouds": require("./../pictures/icons/night/few clouds.svg")
    .ReactComponent,
  "scattered clouds": require("./../pictures/icons/night/scattered clouds.svg")
    .ReactComponent,
  "broken clouds": require("./../pictures/icons/night/scattered clouds.svg")
    .ReactComponent,
  "overcast clouds": require("./../pictures/icons/night/overcast clouds.svg")
    .ReactComponent,
  mist: require("./../pictures/icons/night/mist.svg").ReactComponent,
  fog: require("./../pictures/icons/night/mist.svg").ReactComponent,
  "light rain": require("./../pictures/icons/night/cloudy and rainy.svg")
    .ReactComponent,
  "light intensity drizzle rain":
    require("./../pictures/icons/night/cloudy and rainy.svg").ReactComponent,
  "shower rain": require("./../pictures/icons/night/cloudy and rainy.svg")
    .ReactComponent,
  "moderate rain": require("./../pictures/icons/night/cloudy and rainy.svg")
    .ReactComponent,
  showers: require("./../pictures/icons/night/cloudy and rainy.svg")
    .ReactComponent,
  "heavy rain": require("./../pictures/icons/night/rain.svg").ReactComponent,
  "light snow": require("./../pictures/icons/night/snow.svg").ReactComponent,
  "moderate snow": require("./../pictures/icons/night/snow.svg").ReactComponent,
  "heavy snow": require("./../pictures/icons/night/snow.svg").ReactComponent,
  thunderstorm: require("./../pictures/icons/night/thunder.svg").ReactComponent,
  "thunderstorm with rain":
    require("./../pictures/icons/night/thunderstorm with rain.svg")
      .ReactComponent,
};

const Icon = ({
  weather,
  timezone,
  style,
  sunsetTime,
  setSunsetTime,
  sunriseTime,
  setSunriseTime,
}) => {
  const [isDay, setIsDay] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  // Unix timestamp
  useEffect(() => {
    if (weather) {
      const currentTimestamp = Math.floor(
        (Date.now() + timezone * 1000) / 1000
      );
      const sunriseTimestamp = weather.sys.sunrise + timezone;
      const sunsetTimestamp = weather.sys.sunset + timezone;

      // Create Date objects from the timestamps
      const currentDate = new Date(currentTimestamp * 1000);
      const sunriseDate = new Date(sunriseTimestamp * 1000);
      const sunsetDate = new Date(sunsetTimestamp * 1000);

      // Format the dates as hours and minutes
      const currentTimeIcon = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        hour12: false,
      });
      const sunriseTimeIcon = sunriseDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        hour12: false,
      });
      const sunsetTimeIcon = sunsetDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        hour12: false,
      });

      setCurrentTime(currentTimeIcon);
      setSunsetTime(sunsetTimeIcon);
      setSunriseTime(sunriseTimeIcon);

      const calculateIsDay = () => {
        setIsDay(currentDate <= sunsetDate && currentDate > sunriseDate);
      };

      calculateIsDay();
    }
  }, [weather]);

  if (!weather) {
    return null;
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
    return <WeatherIconComponent style={style} />;
  } else {
    return null;
  }
};

export default Icon;
