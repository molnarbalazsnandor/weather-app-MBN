https://home.openweathermap.org/api_keys

Design is based on: https://app.uizard.io/templates/Ewg08vdL3KCPwevXrX3B/preview

Source of weather icons: https://www.figma.com/file/0f9r0b22UwYTM8W5Nj0LvA/Weather-Glassmorphism-Icon-(Community)?type=design&node-id=0-1&mode=design&t=f6osKQsNePWalJAm-0

Used packages:

- sass
- @mui/material
- @mui/icons-material
- @mui/system
- react-select; react-select-async-paginate, react-card-flip
- react-tsparticles

SunsetTime, sunriseTime and timezone were managed by a Reducer in a Context, for these would have require prop drilling otherwise, and were not part of any conditional rendering.
