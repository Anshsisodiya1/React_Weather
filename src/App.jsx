import React, { useState } from "react";
import "./App.css";

// Import images from src/assets
import Clear from "./assets/clear.png";
import Clouds from "./assets/clouds.png";
import Drizzle from "./assets/drizzle.png";
import Mist from "./assets/mist.png";
import Rain from "./assets/rain.png";
import Snow from "./assets/snow.png";
import Wind from "./assets/wind.png";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "134802f29d2f4f908cfdd96b6d163245";

  const weatherImages = {
    Clear: Clear,
    Clouds: Clouds,
    Rain: Rain,
    Drizzle: Drizzle,
    Thunderstorm: Wind,
    Snow: Snow,
    Mist: Mist,
    Fog: Mist, // Assuming Mist and Fog use the same image
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("City Not Found");
      const data = await response.json();
      setWeatherData(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  const handleInputChange = (e) => setCity(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) fetchWeather();
  };

  const getWeatherImage = () => {
    if (!weatherData) return null;
    const condition = weatherData.weather[0].main;
    return weatherImages[condition] || Wind; // Use a default image if no match is found
  };

  return (
    <div className="app">
      <h1 className="app-title">Weather App</h1>
      <form onSubmit={handleSearch} className="form">
        <input
          type="text"
          className="input"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2 className="city-name">{weatherData.name}</h2>
          <p className="temperature">
            Temperature: {Math.round(weatherData.main.temp - 273.15)}°C
          </p>
          <p className="description">
            Weather: {weatherData.weather[0].description}
          </p>
          <img
            src={getWeatherImage()}
            alt={weatherData.weather[0].description}
            className="weather-image"
          />
        </div>
      )}
    </div>
  );
};

export default App;
