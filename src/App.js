
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactLoading from 'react-loading';
import { fetchWeatherData } from './services/weatherService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Map from './map/map';
import { getWeatherIcon } from './weatherIcons';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]);
  const getWeatherData = async () => {
    try {
      const data = await fetchWeatherData(currentLocation[0], currentLocation[1]);
      console.log('Fetched data:', data);
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {

    if (currentLocation?.length > 0) {
      getWeatherData();
    }

  }, currentLocation);

  const handleGetCurrentLocation = () => {
    setLoading(true)
    setWeatherData(null)
    setError(null)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setCurrentLocation([latitude, longitude]);
          getWeatherData();
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


  return (
    <div className="App">
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom ">
        <h5 className="my-0 me-md-auto font-weight-normal">Codibly task</h5>
        <a className="btn btn-light ms-md-auto" href="https://github.com/SweetHexagon">Github</a>
      </div>

      <div className="container">


        <div className="mb-5 ">
          <Map
            onLocationSelect={(lat, lng) => {

              setCurrentLocation([lat, lng]);
              setLoading(true);
              setWeatherData(null);
              setError(null);
            }}
            center={currentLocation}
          />
        </div>

        <div className="mb-5 d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handleGetCurrentLocation}>
            Get Current Location
          </button>
        </div>

        {(!loading && weatherData) ? (
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
