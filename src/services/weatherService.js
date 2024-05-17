export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await fetch(`http://localhost:8080/weather?latitude=${latitude}&longitude=${longitude}`);
    if (!response.ok) {
      throw new Error('Response from the server is not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
