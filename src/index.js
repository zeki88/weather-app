import './style.css'
import { format, parseISO } from 'date-fns'

const search = document.getElementById('search_input')

async function getData (city) {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8170f73c01f9439985904730240103&q=${city}&days=3&aqi=no&alerts=no`, { mode: 'cors' })
  const data = await response.json()
  return data
}

search.addEventListener('keyup', async (event) => {
  if (event.key === 'Enter') {
    const city = search.value
    const data = await getData(city)
    current(data)
    forecast(data)
    console.log(data)
  }
})

function forecast (data) {
  for (let i = 0; i < 3; i++) {
    const date = parseISO(data.forecast.forecastday[i].date)
    document.getElementById(`day${i + 1}_date`).innerHTML = format(date, 'EEEE')
    document.getElementById(`day${i + 1}_weather`).innerHTML = data.forecast.forecastday[i].day.condition.text
    document.getElementById(`day${i + 1}_min_temp`).innerHTML = 'Min: ' + data.forecast.forecastday[i].day.mintemp_c + '°C'
    document.getElementById(`day${i + 1}_max_temp`).innerHTML = 'Max: ' + data.forecast.forecastday[i].day.maxtemp_c + '°C'
    document.getElementById(`icon${i + 1}`).innerHTML = `<img src="${data.forecast.forecastday[i].day.condition.icon}" alt="Weather Icon">`
  }
}

function current (data) {
  document.getElementById('country').innerHTML = data.location.country
  document.getElementById('city_name').innerHTML = data.location.name
  document.getElementById('weather').innerHTML = data.current.condition.text
  document.getElementById('temp').innerHTML = 'Actual: ' + data.current.temp_c + '°C'
  document.getElementById('humidity').innerHTML = 'Humidity: ' + data.current.humidity + '%'
  document.getElementById('wind').innerHTML = 'Wind: ' + data.current.wind_kph + 'km/h'
  document.getElementById('feels_like').innerHTML = 'Feels like: ' + data.current.feelslike_c + '°C'
  document.getElementById('pressure').innerHTML = 'Pressure: ' + data.current.pressure_mb + 'mb'
  document.getElementById('icon').innerHTML = '<img src="' + data.current.condition.icon + '" alt="Weather Icon">'
}

async function defaultCity () {
  const city = 'Buenos Aires'
  const data = await getData(city)
  current(data)
  forecast(data)
  console.log(data)
}

defaultCity()
