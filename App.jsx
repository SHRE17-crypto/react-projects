import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const API_KEY = 'YOUR_API_KEY'

  function handleChange(e) {
    setCity(e.target.value)
  }

  async function searchWeather() {
    if (city.trim() === '') {
      setError('Please enter a city name')
      return
    }

    setLoading(true)
    setError('')
    setWeather(null)

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )

      if (!response.ok) {
        throw new Error('City not found')
      }

      const data = await response.json()

      setWeather(data)
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <div className="app">

      <h1>🌦️ Weather Forecast</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleChange}
        />

        <button onClick={searchWeather}>
          Search
        </button>
      </div>

      {loading && <p>Loading weather...</p>}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">

          <h2>
            {weather.name}, {weather.sys.country}
          </h2>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />

          <h3>{Math.round(weather.main.temp)}°C</h3>

          <p>
            {weather.weather[0].description}
          </p>

          <div className="weather-info">

            <div>
              <strong>Feels Like</strong>
              <p>{Math.round(weather.main.feels_like)}°C</p>
            </div>

            <div>
              <strong>Humidity</strong>
              <p>{weather.main.humidity}%</p>
            </div>

            <div>
              <strong>Wind</strong>
              <p>{weather.wind.speed} m/s</p>
            </div>

            <div>
              <strong>Pressure</strong>
              <p>{weather.main.pressure} hPa</p>
            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default App