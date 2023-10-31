import "./App.css";
import WeatherProvider from "./WeatherContext";
import WeatherApp from "./components/WeatherApp";

function App() {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
}

export default App;
