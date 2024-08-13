Weather-App-MBN

A pet project focusing on diverse API calls and data management, and displaying these results in a clean and aesthetic but also responsively designed surface.
The project is deployed in Firebase and is available at:
https://mbn-weather-app.web.app/

Design is based on: https://app.uizard.io/templates/Ewg08vdL3KCPwevXrX3B/preview

Source of weather icons: https://www.figma.com/file/0f9r0b22UwYTM8W5Nj0LvA/Weather-Glassmorphism-Icon-(Community)?type=design&node-id=0-1&mode=design&t=f6osKQsNePWalJAm-0

APIs:

- https://rapidapi.com/wirefreethought/api/geodb-cities:
  a free and flexible geolocation database with a miriad of call options and filters,
- https://home.openweathermap.org/:
  a weather forecasting database, where the free plan provides calls for current weather conditions, and forecast data for the next 5 days, with 3-hourly intervals.

Used packages:

- sass
- @mui/material
- @mui/icons-material
- @mui/system
- react-select; react-select-async-paginate, react-card-flip
- react-tsparticles (@1.42.1, important!)
- firebase-tools

How it works:

- WeatherApp.jsx:
  provides the main structure of the app, and also defines and distributes the basic states: selectedCity, weather, hourlyForecast and weeklyForecast.
- Geolocation.jsx:
  if the user gives permission to geolocation, it sends a GeoDB fetch based on that, and sets selectedCity accordingly.
- GeoDbAutocomplete.jsx:
  otherwise, this component does so, with the help of the async-paginate, which will also display the top 5 results from GeoDB when the user starts typing.
- FetchWeather.js
  after selectedCity is set, FetchWeather sends both the current weather and weather forecast API calls to OpenWeather.
  - First, the current weather will be saved in the weather state.
  - Then, based on the timezone of the searched location, it will set CurrentTime, SunsetTime, sunriseTime and Timezone. These were managed by a Reducer in a Context, for they would have required prop drilling otherwise, and were not part of any conditional rendering.
  - Then the 3-hourly forecast data will be fetched, and adjusted with the help of the time parameters discussed above.
  - this data will also be used to calculate forecasts for the next 5 days, by grouping them for each day, and then calculating either the averages or the modes of the 3-hourly forecasts, depending on the type of the data. This was necessary since the daily forecast is not available in the free package of the API provider.
- ForecastBasic.jsx:
  As the name suggests, it displays the basic weather information for the chosen location, as well as the local time. The box can be expanded accordion-style, and the weather icon is changing dynamically according to the time of the day, and the weather conditions.
- ForecastThreeHourly.jsx: for a user-friendly display of all the 3-hourly forecasts, a swiper component was introduced, where each slide wrapped a flippable card. the front of the card shows the time, the temperature, and the weather icon (dynamically changing based on weather and time of the day) of the specific forecasts, and when the card is flipped, the backside reveals additional details. Both the cards and the swiper resets with each new search.
- ForecastDetails.jsx: a simple component display all the additional weather data that was not shown in ForecastBasic: real feel temperature, wind speed, humidity, and air pressure.
- ForecastWeekly.jsx: displays the forecast for the next 5 days, where each card is an accordion, and can be expanded for more details. Only one accordion can be open at a time.
