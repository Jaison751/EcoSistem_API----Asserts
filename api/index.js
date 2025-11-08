const express = require('express');
const app = express();
const items = require('./items/network')
const config = require('../config')
const bodyParser = require('body-parser')
//routes

app.use(bodyParser.json())

app.use('/elements', items);

app.listen(config.api.port, () =>{
    console.log("Server Run on port: "+ config.api.port );
});