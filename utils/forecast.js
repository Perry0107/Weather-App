const request = require('request')
const forecast = (lat, lon, callback) => {
    // console.log(url)
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+encodeURIComponent(lat)+"&lon="+encodeURIComponent(lon)+"&appid=a3e58e06bca786c3231c2b8e1df37574&units=metric"
    // const url = 'http://api.weatherstack.com/current?access_key=5874a8856e41a386547a27e3aaaf7145&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon) + '$units=s'
    // console.log(url)

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to API 2', undefined)
        } else if (response.body.error) {
            // console.log(response.body.error)
            callback(response.body.error, undefined)
        } else {
            //callback(undefined, response.body.weather[0].description + '.The temp is ' + response.body.main.temp)
            callback(undefined,{
                Description:response.body.weather[0].description,
                Temperature:response.body.main.temp,
                WindSpeed:response.body.wind.speed,
                Visibitlity:response.body.visibility,
                FeelsLike:response.body.main.feels_like,
                humidity:response.body.main.humidity
            })
        }
    })
}

module.exports = forecast