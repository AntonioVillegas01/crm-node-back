const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


exports.registrarUsuario = async (req,res) => {

    //leer los datos del usuario y colocarlos en Usuarios
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try{
        await usuario.save();
        res.json({mensaje: 'Usuario Creado Correctamente'})

    }catch(e){
        console.log(e)
        res.json({mensaje: 'Hubo un error'})
    }

}


exports.autenticarUsuario = async (req, res, next) => {

    const {email, password} = req.body;
    const usuario = await Usuarios.findOne({email})

    if(!usuario){
        await res.status(401).json({mensaje:'Ese usuario no existe'});
        next();
    }else{
        //Verificar si el password es correcto
        if(!bcrypt.compareSync(password, usuario.password)){
            // si el password es incorrecto
            await res.status(401).json({mensaje:'Password incorrecto'})
            next();
        }else{
            //password correcto, firmar el token
            const token = jwt.sign({
                email : usuario.email,
                usuario: usuario.nombre,
                _id: usuario.id
            }, 'LLAVESECRETA', {
                expiresIn: '1h'
            })
            //retornar el token
            res.json({token})
        }
    }

}