console.log('loaded!')
// fetch('')
const weather = document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.querySelector('#message-1')
const message_2 = document.querySelector('#message-2')
weather.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = "/weather?city=" + encodeURIComponent(search.value)
    console.log(search.value)
    console.log(url)
    fetch(url).then((response) => {
        response.json().then((data) => {
            message_1.textContent=data.Description
            const msg='The Temp is '+data.Temperature+',but it feels like '+data.FeelsLike+'. The wind speed is '+data.WindSpeed+'and visibility is '+data.Visibitlity+'. The humidity is '+data.humidity+'%.'
            message_2.textContent=msg
        })
    })
}) 