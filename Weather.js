import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

  const handleSearch = async () => {
    if (city) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    }
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}>
      <div className="container mx-auto p-4">
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="float-right bg-blue-500 text-white py-1 px-2 rounded"
        >
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <h1 className="text-2xl font-bold mb-4">Weather App</h1>
        <input 
          type="text" 
          value={city} 
          onChange={e => setCity(e.target.value)} 
          className="border p-2 mb-4 w-full" 
          placeholder="Enter city name"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white py-2 px-4 rounded">Search</button>
        {weatherData && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Condition: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
