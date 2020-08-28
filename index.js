const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');


//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


const app = express();

//Habilitar el body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended:true }));

//Habilitar Cors
app.use( cors() );

//Rutas app
app.use( '/', routes() );

//Carpeta estatica
app.use(express.static('uploads'));


app.listen(5000);