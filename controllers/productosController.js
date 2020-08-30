const Productos = require( '../models/Productos' );
const fs = require('fs');

const multer = require( 'multer' );
const shortid = require( 'shortid' );


const configuracionMulter = {
    storage: fileStorage = multer.diskStorage( {
        destination: ( req, file, next ) => {
            next( null, __dirname + '../../uploads/' );
        },
        filename: ( req, file, next ) => {
            const extension = file.mimetype.split( '/' )[1];
            next( null, `${shortid.generate()}.${extension}` );
        }
    } ),
    fileFilter( req, file, next ) {
        if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
            //el formato es valido
            next( null, true );
        } else {
            // el formato no es valido
            next( new Error( 'Formato no válido' ), false );
        }
    }
}

const upload = multer( configuracionMulter ).single( 'imagen' );


//Sube un archivo
exports.subirArchivo = ( req, res, next ) => {
    upload( req, res, function( error ) {
        if( error ) {
            res.json( { mensaje: 'Error:' + error } )
        }
        return next();
    } )
}


//AGREGAR NUEVO PRODUCTO
exports.nuevoProducto = async( req, res, next ) => {
    const producto = new Productos( req.body );
    try {
        if( req.file.filename ) {
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json( { mensaje: `Se agrego el siguiente producto: ${producto.nombre}` } )

    } catch( e ) {
        console.log( e );
        next();
    }
}

//Mostrar TODOS Productos
exports.mostrarProductos = async( req, res, next ) => {
    try {
        const productos = await Productos.find( {} )
        res.json( productos );

    } catch( e ) {
        console.log( e );
        next();

    }
}

//muestra producto por id
exports.mostrarProducto = async( req, res, next ) => {
    const producto = await Productos.findById( req.params.id );
    if( !producto ) {
        res.json( { mensaje: 'Ese producto no existe ' } );
        next();
    }
    //mostrar el producto
    res.json( producto );
}

//Actualizar Producto por id
exports.actualizarProducto = async( req, res, next ) => {
    try {
        //Construir nuevo producto
        let nuevoProducto = req.body;
        //Verificar si hay una imagen
        if( req.file ) {
            nuevoProducto.imagen = req.file.filename
        } else {
            let productoAnterior = await Productos.findById( req.params.id );
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate( { _id: req.params.id }, nuevoProducto, {
            new: true
        } );
        res.json( producto );
    } catch( e ) {
        console.log( e );
        next();
    }
}

//Eliminar Producto via ID
exports.eliminarProducto = async (req,res,next)=>{
    try{
       const producto = await Productos.findOneAndDelete({_id: req.params.id});

       if(producto.imagen){
           const imagenAnteriorPath = __dirname + `/../uploads/${producto.imagen}`;
           fs.unlink(imagenAnteriorPath, (error) => {
               if(error) {
                   console.log(error);
               }
           })
       }
        res.json({
            mensaje: `El producto ${producto.nombre} se ha eliminado`
        })

    }catch( e ) {
        console.log(e);
        next();
    }
}

exports.buscarProducto = async (req, res, next) => {
    try{
        //obtener el query
        const {query} = req.params;
        const producto = await Productos.find({nombre: new RegExp(query, 'i')})
        res.json(producto)

    }catch( e ) {
        console.log(e);
        next();
    }
}



















