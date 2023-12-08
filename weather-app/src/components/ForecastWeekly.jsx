import React from "react";
import "./ForecastWeekly.css";
import Icon from "./Icon";
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ForecastWeekly({ weeklyForecast }) {
  return (
    <Paper className="forecast-weekly">
      <Typography className="weekly-title" variant="h6">
        5-DAY FORECAST
      </Typography>
      <Box className="weekly-items">
        {weeklyForecast.slice(1, 6).map((forecast, i) => (
          <Box
            className={i === 4 ? "weekly-box last-box" : "weekly-box"}
            key={i}
          >
            <Typography className="weekly-item-day" variant="h6">
              {forecast.dayOfWeek.slice(0, 3)}
            </Typography>
            <Icon
              className="weekly-item-icon"
              style={{ width: "5vw", minWidth: "60px", height: "auto" }}
              weather={forecast}
            />
            <Accordion className="weekly-accordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="expand-more-icon" />}
                className="weekly-accordion-summary"
              >
                <Typography className="weekly-accordion-summary-typography description">
                  {forecast.weather[0].description}
                </Typography>
                <Typography className="weekly-accordion-summary-typography">
                  {forecast.temp_max ? Math.round(forecast.temp_max) : "N/A"}/
                  {forecast.temp_min ? Math.round(forecast.temp_min) : "N/A"}°C
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="weekly-accordion-details">
                <Box className="weekly-accordion-details-box">
                  <OpacityIcon />
                  <Typography>
                    :{" "}
                    {forecast.humidity ? Math.round(forecast.humidity) : "N/A"}%
                  </Typography>
                </Box>
                <Box className="weekly-accordion-details-box">
                  <AirIcon />
                  <Typography>
                    :{" "}
                    {forecast.wind_speed
                      ? `${forecast.wind_speed.toFixed(1)} km/h`
                      : "N/A"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default ForecastWeekly;
