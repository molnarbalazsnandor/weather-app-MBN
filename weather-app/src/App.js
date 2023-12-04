import "./App.css";
import WeatherProvider from "./WeatherContext";
import WeatherApp from "./components/WeatherApp";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

function App() {
  let theme = createTheme({
    typography: {
      fontFamily: ["Poppins"],
    },
  });
  theme = responsiveFontSizes(theme);

  return (
    <WeatherProvider>
      <ThemeProvider theme={theme}>
        <WeatherApp />
      </ThemeProvider>
    </WeatherProvider>
  );
}

export default App;
