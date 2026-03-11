if ('scrollRestoration' in history) {
history.scrollRestoration='manual'
}

window.scrollTo(0,0)

const apiKey='1e3c0e8738566e37de62d07361c8affa'
const defaultCity='Delhi'

document.getElementById('searchButton').addEventListener('click',()=>{

const city=document.getElementById('cityInput').value||defaultCity
fetchWeatherData(city)

})

function fetchWeatherData(city){

const currentWeatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
const forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

Promise.all([

fetch(currentWeatherUrl).then(response=>response.json()),
fetch(forecastUrl).then(response=>response.json())

]).then(([currentWeatherData,forecastData])=>{

displayCurrentWeather(currentWeatherData)
displayForecast(forecastData)

}).catch(error=>{

console.error('Error fetching weather data:',error)
alert('Failed to fetch weather data. Please try again.')

})

}

function displayCurrentWeather(data){

const card=document.getElementById("currentWeather")

card.style.animation="none"
card.offsetHeight
card.style.animation="weatherCardAppear 0.7s ease"

const weatherCondition=data.weather[0].description
const temperature=`${Math.round(data.main.temp)}°C`
const humidity=`Humidity: ${data.main.humidity}%`
const windSpeed=`Wind Speed: ${Math.round(data.wind.speed)} m/s`

document.getElementById('weatherCondition').textContent=`Weather Condition: ${weatherCondition}`
document.getElementById('temperature').textContent=`Temperature: ${temperature}`
document.getElementById('humidity').textContent=humidity
document.getElementById('windSpeed').textContent=windSpeed

startClock()

}

function startClock(){

function updateClock(){

const now=new Date()

const timeString=now.toLocaleString('en-IN',{
timeZone:'Asia/Kolkata',
weekday:'short',
year:'numeric',
month:'short',
day:'numeric',
hour:'2-digit',
minute:'2-digit',
second:'2-digit'
})

document.getElementById('dateTime').textContent=`Date & Time (IST): ${timeString}`

}

updateClock()
setInterval(updateClock,1000)

}

function displayForecast(data){

const forecastTableBody=document.querySelector('#forecastTable tbody')
forecastTableBody.innerHTML=''

data.list.forEach(item=>{

if(item.dt_txt.includes('12:00:00')){

const date=new Date(item.dt*1000).toLocaleDateString()
const condition=item.weather[0].description
const temperature=`${Math.round(item.main.temp)}°C`
const humidity=`${item.main.humidity}%`
const windSpeed=`${Math.round(item.wind.speed)} m/s`

const row=document.createElement('tr')

row.innerHTML=`
<td>${date}</td>
<td>${condition}</td>
<td>${temperature}</td>
<td>${humidity}</td>
<td>${windSpeed}</td>
`

forecastTableBody.appendChild(row)

}

})

}

fetchWeatherData(defaultCity)