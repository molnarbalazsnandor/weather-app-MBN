import React, { useState, useEffect } from "react";

const weatherIconsDay = {
  clear: require("./../pictures/icons/day/clear.svg").ReactComponent,
  "cloudy and rainy": require("./../pictures/icons/day/cloudy and rainy.svg")
    .ReactComponent,
  cloudy: require("./../pictures/icons/day/cloudy.svg").ReactComponent,
  "heavyrain and storm":
    require("./../pictures/icons/day/heavyrain and storm.svg").ReactComponent,
  rain: require("./../pictures/icons/day/rain.svg").ReactComponent,
  "sunny-1": require("./../pictures/icons/day/sunny-1.svg").ReactComponent,
  "sunny-2": require("./../pictures/icons/day/sunny-2.svg").ReactComponent,
  thunder: require("./../pictures/icons/day/thunder.svg").ReactComponent,
};

const weatherIconsNight = {
  clear: require("./../pictures/icons/night/clear.svg").ReactComponent,
  cloudy: require("./../pictures/icons/night/cloudy.svg").ReactComponent,
  "full moon": require("./../pictures/icons/night/full moon.svg")
    .ReactComponent,
  "heavyrain and storm":
    require("./../pictures/icons/night/heavyrain and storm.svg").ReactComponent,
  "night rain": require("./../pictures/icons/night/night rain.svg")
    .ReactComponent,
  night: require("./../pictures/icons/night/night.svg").ReactComponent,
  rain: require("./../pictures/icons/night/rain.svg").ReactComponent,
  thunder: require("./../pictures/icons/night/thunder.svg").ReactComponent,
};

const iconStyle = {
  width: "10vw",
  height: "10vh",
};

const WeatherIcon = ({ iconName }) => {
  const [isDay, setIsDay] = useState(true);
  const weatherIcons = isDay ? weatherIconsDay : weatherIconsNight;
  const WeatherIconComponent = weatherIcons[iconName];

  useEffect(() => {
    const currentTime = new Date().getHours();
    setIsDay(currentTime >= 4 && currentTime < 18);
  }, []);

  if (WeatherIconComponent) {
    return <WeatherIconComponent style={iconStyle} />;
  } else {
    return null; // Handle the case when the weather condition is not found
  }
};

export default WeatherIcon;
