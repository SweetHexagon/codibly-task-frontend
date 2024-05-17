// src/App.js

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactLoading from 'react-loading';
import { fetchWeatherData } from './services/weatherService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloudRain, faCloudShowersHeavy, faSmog, faSnowflake, faBolt, faCloudMeatball } from '@fortawesome/free-solid-svg-icons';
import Map from './map/map';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const getWeatherData = async () => {
        try {
          const data = await fetchWeatherData(latitude, longitude);
          console.log('Fetched data:', data);
          setWeatherData(data);
          setLoading(false);
        } catch (error) {
          console.error('Fetch error:', error);
          setError(error);
          setLoading(false);
        }
      };

      getWeatherData();
    }
  }, [latitude, longitude]);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setCurrentLocation([latitude, longitude]);
          setLoading(true);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError(error);
        }
      );
    } else {
      console.error('Error while fetching geolocation.');
      setError(new Error('Error while fetching geolocation.'));
    }
  };

  const getWeatherIcon = (code) => {
    switch (code) {
      case 0: // Clear sky
        return faSun;
      case 1:
      case 2:
      case 3: // Mainly clear, partly cloudy, and overcast
        return faCloudSun;
      case 45:
      case 48: // Fog and depositing rime fog
        return faSmog;
      case 51:
      case 53:
      case 55: // Drizzle: Light, moderate, and dense intensity
        return faCloudRain;
      case 56:
      case 57: // Freezing Drizzle: Light and dense intensity
        return faCloudMeatball;
      case 61:
      case 63:
      case 65: // Rain: Slight, moderate and heavy intensity
        return faCloudShowersHeavy;
      case 66:
      case 67: // Freezing Rain: Light and heavy intensity
        return faCloudMeatball;
      case 71:
      case 73:
      case 75: // Snow fall: Slight, moderate, and heavy intensity
        return faSnowflake;
      case 77: // Snow grains
        return faSnowflake;
      case 80:
      case 81:
      case 82: // Rain showers: Slight, moderate, and violent
        return faCloudRain;
      case 85:
      case 86: // Snow showers slight and heavy
        return faSnowflake;
      case 95: // Thunderstorm: Slight or moderate
        return faBolt;
      case 96:
      case 99: // Thunderstorm with slight and heavy hail
        return faBolt;
      default:
        return faSun; // Default to clear
    }
  };

  return (
    <div className="App">
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom ">
        <h5 className="my-0 me-md-auto font-weight-normal">Codibly task</h5>
        <a className="btn btn-light ms-md-auto" href="#">Github</a>
      </div>

      <div className="container">


        <div className="mb-5 ">
          <Map
            onLocationSelect={(lat, lng) => {
              setLatitude(lat);
              setLongitude(lng);
              setCurrentLocation([lat, lng]);
              setLoading(true);
            }}
            center={currentLocation}
          />
        </div>

        <div className="mb-5 d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handleGetCurrentLocation}>
            Get Current Location
          </button>
        </div>

        {weatherData ? (
          <table className="table table-bordered">
            <thead>
            <tr>
              {weatherData.daily.time.map((date, index) => (
                <th key={index}>{new Date(date).toLocaleDateString('pl-PL')}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            <tr>
              {weatherData.daily.weather_code.map((code, index) => (
                <td key={index}>
                  <FontAwesomeIcon icon={getWeatherIcon(code)} />
                </td>
              ))}
            </tr>
            <tr>
              {weatherData.daily.temperature_2m_max.map((temp, index) => (
                <td key={index}>Max: {temp}°C</td>
              ))}
            </tr>
            <tr>
              {weatherData.daily.temperature_2m_min.map((temp, index) => (
                <td key={index}>Min: {temp}°C</td>
              ))}
            </tr>
            <tr>
              {weatherData.energyGenerated.map((energy, index) => (
                <td key={index}>{energy.toFixed(2)} kWh</td>
              ))}
            </tr>
            </tbody>
          </table>
        ) : (
          <div>
            {error ? (
              <div className="d-flex justify-content-center">
                Error: {error.message}
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <ReactLoading type="bubbles" color="blue" height={'10%'} width={'10%'} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
