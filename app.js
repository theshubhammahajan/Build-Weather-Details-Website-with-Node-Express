'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const request = require('request');
const keyConfig = require('./config/keys');
//TODO: Middlewares
app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/', (req, res) => {
    var city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${keyConfig.apikey}`;
    console.log(url);
    request(url, (err, response, body) => {
        if (err) {
            console.log('Error ', err);
        } else {
            let weather = JSON.parse(body);
            console.log(weather)
        }
    })
});


//TODO: Activating Server
app.listen(3000, () => {
    console.log(`Server started on port`);
});