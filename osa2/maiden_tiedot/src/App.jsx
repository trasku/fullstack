import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const CountryList = ({ countries, setSearch }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  }

  return (
    <div>
      {countries.map((country) => (
        <p key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => setSearch(country.name.common)}>Show</button>
        </p>
      ))}
    </div>
  )
}

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (country.capital) {
      const capital = country.capital[0]
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
      axios.get(url)
        .then((response) => {
          setWeather(response.data)
        })
    }
  }, [country])
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area} km²</p>
      <h4>Languages:</h4>
      <ul>
        {Object.values(country.languages || {}).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="150" />
      <h4>Weather in {country.capital?.[0]}</h4>
      {weather ? (
        <>
          <p>Temperature: {weather.main.temp} °C</p>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description} 
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}

          </div>
        )
      }

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredCountries([])
      return
    }
    const result = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredCountries(result)
  }, [search, countries])

  return (
    <div>
      <h1>Find countries</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <CountryList countries={filteredCountries} setSearch={setSearch} />
    </div>
  )
}

export default App
