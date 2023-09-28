import React, { useState } from "react";
import "./styles.css";
import PlaceIcon from "@mui/icons-material/Place";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import SpeedIcon from "@mui/icons-material/Speed";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import AirIcon from "@mui/icons-material/Air";
const myApiKey = import.meta.env.VITE_MYWEATHER_API_KEY;

const Weather = () => {
  const [searchBox, setSearchBox] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const searchPressed = () => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchBox}&appid=${myApiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      searchPressed();
    }
  };

  return (
    <div className="weather-app-container">
      <div className="header">
        <h1 className="app-title">Weather App😃</h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="Enter City Name"
            name=""
            id=""
            onKeyDown={handleKeydown}
            onChange={(e) => setSearchBox(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {Object.keys(weather).length > 0 && !loading && (
          <div className="weather-info">
            <p className="location">
              {weather.name}, {weather.sys.country}
              <PlaceIcon />
            </p>
            <div className="rest">
              <div className="temperature ms-2 text-center">
                <p>
                  {(weather.main.temp - 273.1).toFixed(2)}°C{" "}
                  <DeviceThermostatIcon className="temp-icon" />
                </p>
              </div>

              <div className="condition-container d-flex">
                <p>Condition: {weather.weather[0].main}</p>
                <VisibilityIcon className="ms-1 condition-icon" />
              </div>

              <div className="feels-like-container d-flex">
                <p>
                  Feels like: {(weather.main.feels_like - 273.1).toFixed(2)}°c
                </p>
                <ContactSupportIcon className="ms-1 feels-like-icon " />
              </div>

              <div className="humidity-container d-flex">
                <p>Humidity: {weather.main.humidity}%</p>
                <WaterDropIcon className="humidity-icon" />
              </div>

              <div className="pressure-container d-flex">
                <p>Pressure: {weather.main.pressure} hPa</p>
                <SpeedIcon className="ms-1" />
              </div>
              <div className="wind-container d-flex">
                <p>Wind Speed: {weather.wind.speed} m/s </p>
                <AirIcon className="ms-1 wind-speed-icon" />
              </div>
            </div>
          </div>
        )}

        {loading && (

          
          <p className="loading-message">
     loading....
          </p>
        )}
      </div>
    </div>
  );
};

export default Weather;
