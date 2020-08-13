const config = require('./config/config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { mongoose } = require('./database');


const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

//middlewares

app.use(express.json());


//global route

app.use('/api/task', require('./router/index-router'));


//static file

app.use(express.static(path.join(__dirname, 'public')));

//listening

app.listen(process.env.PORT, () => {

    console.log(`Server on port ${process.env.PORT}`);
});