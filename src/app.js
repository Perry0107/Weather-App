const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../../weather_app/utils/geocode')
const forecast = require('../../weather_app/utils/forecast')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ballu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',

        name: 'Ballu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ballu'
    })
})

app.get('/weather', (req, res) => {
    const address=req.query.city
    geocode(address, (error, data) => {
        if (error != undefined) {
            res.send(error)
        }
        else 
        {
            const lat=data.latitude
            const lon=data.longitude
            forecast(lat, lon, (error, data) => {
                if (error != undefined) console.log(error)
                else res.send(data)
            })
            
        }
    })
})
app.get('/products', (req, res) => {
    res.send({
       products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ballu',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ballu',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})