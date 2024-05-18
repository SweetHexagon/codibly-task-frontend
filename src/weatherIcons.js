import { faSun, faCloudSun, faCloudRain, faCloudShowersHeavy, faSmog, faSnowflake, faBolt, faCloudMeatball } from '@fortawesome/free-solid-svg-icons';

export const getWeatherIcon = (code) => {
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
