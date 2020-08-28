const Pedidos = require( '../models/Pedidos' );

exports.nuevoPedido = async( req, res, next ) => {
    const pedido = new Pedidos( req.body );
    try {
        await pedido.save();
        res.json( { mensaje: 'Se agregó un nuevo pedido' } );
    } catch( error ) {
        console.log( error );
        next();
    }
}

//Muestra todos los pedidos
exports.mostrarPedidos = async( req, res, next ) => {
    try {
        const pedidos = await Pedidos.find( {} ).populate( 'cliente' ).populate( {
            path: 'pedido.producto',
            model: 'Productos'
        } );
        res.json( pedidos )

    } catch( e ) {
        console.log( e );
        next();
    }
}

//Muestra un pedido por su id
exports.mostrarPedido = async( req, res, next ) => {
    const pedido = await Pedidos.findById( req.params.id ).populate( 'cliente' ).populate( {
        path: 'pedido.producto',
        model: 'Productos'
    } );

    if( !pedido ) {
        res.json( {
            mensaje: 'Este pedido no existe'
        } )
        return next();
    }
    //Mostrar el pedido
    res.json( pedido );
}


//Actualizar el pedido Via ID
exports.actualizarPedido = async( req, res, next ) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate( { _id: req.params.id }, req.body, {
            new: true
        } )
            .populate( 'cliente' )
            .populate( {
                path: 'pedido.producto',
                model: 'Productos'
            } );
        res.json( pedido );
    } catch( e ) {
        console.log( e )
        next();
    }
}

//Eliminar el pedido via ID
exports.eliminarPedido = async( req, res, next ) => {
    try {
        const pedido = await Pedidos.findOneAndDelete( { _id: req.params.id } );
        res.json( {
            mensaje: `El pedido ${pedido.id}, se ha eliminado correctamente`
        } )

    } catch( e ) {
        console.log( e );
        next();
    }
}