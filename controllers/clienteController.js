const Clientes = require( '../models/Clientes' );

//agrega un nuevo cliente
exports.nuevoCliente = async( req, res, next ) => {

    const cliente = new Clientes( req.body );

    try {
        //Almacenar el registro
        await cliente.save();
        res.json( {
            mensaje: 'Se agrego un nuevo cliente'
        } )

    } catch( e ) {
        //Si hay un error, console.log y next
        res.send(e);
        next();
    }

}

//Muestra todos los clientes
exports.mostrarClientes = async( req, res, next ) => {

    try {
        const clientes = await Clientes.find( {} );
        res.json( clientes );

    } catch( e ) {
        console.log( e );
        next();
    }
}

//Muestra un cliente por su id
exports.mostrarCliente = async( req, res, next ) => {
    const cliente = await Clientes.findById( req.params.id );

    if( !cliente ) {
        res.json( { mensaje: 'Ese Cliente no existe' } );
        next();
    }

    res.json( cliente );
}

//Actualiza un cliente por su id
exports.actualizarCliente = async( req, res, next ) => {
    try {
        const cliente = await Clientes.findOneAndUpdate( { _id: req.params.id }, req.body, { new: true } )
        res.json( cliente );
    } catch( e ) {
        res.send(e);
        next();
    }
}

//Elimina el cliente por su id
exports.eliminarCliente = async( req, res, next ) => {
    try {
        await Clientes.findOneAndDelete( { _id: req.params.id } );
        res.json( { mensaje: 'El Cliente se ha eliminado' } );
    } catch( e ) {
        console.log( e );
        next();
    }
}