import React from "react";
import "./ForecastDetails.css";
import { Paper, Typography, Box } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import SpeedIcon from "@mui/icons-material/Speed";

function ForecastDetails({ weather }) {
  const renderDetailItem = (title, icon, info) => (
    <Paper className="detail-item">
      <Box className="icon-and-caption">
        <Box className="icon-container">{icon}</Box>
        <Typography variant="h6" className="title">
          {title}
        </Typography>
      </Box>
      <Typography variant="h5" className="info">
        {info}
      </Typography>
    </Paper>
  );

  return (
    <Paper className="forecast-details">
      <Typography variant="h6" className="details-title">
        DETAILS
      </Typography>
      <Box className="details-container">
        {renderDetailItem(
          "Real Feel",
          <ThermostatIcon className="icon" />,
          `${Math.round(weather.main.feels_like)} °C`
        )}
        {renderDetailItem(
          "Wind Speed",
          <AirIcon className="icon" />,
          `${(weather.wind.speed * 3.6).toFixed(1)} km/h`
        )}
        {renderDetailItem(
          "Humidity",
          <OpacityIcon className="icon" />,
          `${Math.round(weather.main.humidity)} %`
        )}
        {renderDetailItem(
          "Pressure",
          <SpeedIcon className="icon" />,
          `${Math.round(weather.main.pressure)} hPa`
        )}
      </Box>
    </Paper>
  );
}

export default ForecastDetails;
