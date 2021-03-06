const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config( {path:'variables.env'});


//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


const app = express();

//Carpeta estatica
app.use(express.static('uploads'));

//Habilitar el body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended:true }));

//Definir un dominio(s) para recibir peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        // console.log(origin);
        //Si la peticion viene de un servidor que esta en whitelist
        const existe = whitelist.some(dominio => dominio === origin);
        if(existe){
            callback(null,true)
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}

//Habilitar Cors
app.use( cors(corsOptions) );

//Rutas app
app.use( '/', routes() );


const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5000';

app.listen(port, host, ()=>{
    console.log('el servidor esta funcionando')
});