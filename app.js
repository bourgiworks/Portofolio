//plugins
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const articleRoute = require('./routes/articles');
const userRoute= require('./routes/login')
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerExpress= require('swagger-ui-express');
const { application } = require('express');
const cookie =require('cookie-parser')
require('dotenv/config');

// Extend swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'Brand API',
            version: "1.0.0",
            description :'My brand api information'
        },
       
            server: ['https//localhost:7001']

        ,

    },
 apis :['./routes/*.js']
}
const swaggerDocs = swaggerJsDoc (swaggerOptions);
app.use('/api-swagger',swaggerExpress.serve, swaggerExpress.setup(swaggerDocs));



//All schema 




//routes
app.use(express.static('uploads'));
app.use(bodyParser.json())
app.use('/api', articleRoute);
app.use('/api', userRoute);

app.listen(process.env.PORT, () => {
    console.log(`server start at ${process.env.PORT}` );
    mongoose.connect( `${process.env.DB_CONNECTION}`, {useNewUrlParser:true},()=>
 console.log ("Sucessful Connect to DB"));
});

module.exports = app;