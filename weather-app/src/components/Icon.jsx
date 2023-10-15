import React from "react";

const weatherIcons = {
  cloudy: require("./../pictures/icons/cloudy.svg").ReactComponent,
  "cloudy and rainy": require("./../pictures/icons/cloudy and rainy.svg")
    .ReactComponent,
  "clear-1": require("./../pictures/icons/clear-1.svg").ReactComponent,
  "clear-2": require("./../pictures/icons/clear-2.svg").ReactComponent,
  "full moon": require("./../pictures/icons/full moon.svg").ReactComponent,
  "heavyrain and storm": require("./../pictures/icons/heavyrain and storm.svg")
    .ReactComponent,
  "night cloudy": require("./../pictures/icons/night cloudy.svg")
    .ReactComponent,
  "night rain": require("./../pictures/icons/night rain.svg").ReactComponent,
  night: require("./../pictures/icons/night.svg").ReactComponent,
  rain: require("./../pictures/icons/rain.svg").ReactComponent,
  "sunny-1": require("./../pictures/icons/sunny-1.svg").ReactComponent,
  "sunny-2": require("./../pictures/icons/sunny-2.svg").ReactComponent,
  thunder: require("./../pictures/icons/thunder.svg").ReactComponent,
};

const WeatherIcon = ({ iconName }) => {
  const WeatherIconComponent = weatherIcons[iconName];

  if (WeatherIconComponent) {
    return <WeatherIconComponent />;
  } else {
    return null; // Handle the case when the weather condition is not found
  }
};

export default WeatherIcon;
