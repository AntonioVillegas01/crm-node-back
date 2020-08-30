const express = require( 'express' );
const router = express.Router();


const clienteController = require( '../controllers/clienteController' );
const productosController = require( '../controllers/productosController' );
const pedidosController = require( '../controllers/pedidosController' );
const usuariosController = require( "../controllers/usuariosController" );

//middleware para proteger rutas
const auth = require( '../middlewares/auth' )

module.exports = function() {

    // ****** CLIENTES ******

    //Agrega nuevos clientes via POST
    router.post( '/clientes', auth, clienteController.nuevoCliente );
    //Obtener todos los clientes
    router.get( '/clientes',auth, clienteController.mostrarClientes );
    //Muestra a un cliente en especifico
    router.get( '/clientes/:id',auth, clienteController.mostrarCliente );
    //Actualizar Cliente
    router.put( '/clientes/:id', auth, clienteController.actualizarCliente );
    //Eliminar Cliente
    router.delete( '/clientes/:id', auth, clienteController.eliminarCliente );


    // ****** PRODUCTOS ******

    //Agrega un Producto
    router.post( '/productos',
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto
    );
    //Obtener todos los productos
    router.get( '/productos',auth, productosController.mostrarProductos );
    //Obtener producto por id
    router.get( '/productos/:id',auth, productosController.mostrarProducto );
    //Actualizar un producto
    router.put( '/productos/:id',
        auth,
        productosController.subirArchivo,
        productosController.actualizarProducto
    );
    //Eliminar Productos
    router.delete( '/productos/:id',auth, productosController.eliminarProducto );

    //Busqueda de Productos
    router.post( '/productos/busqueda/:query', auth,productosController.buscarProducto )


    // ****** Pedidos ******

    //Agrega un Pedido
    router.post( '/pedidos/nuevo/:id',auth, pedidosController.nuevoPedido );
    //Mostrar todos los pedidos
    router.get( '/pedidos',auth, pedidosController.mostrarPedidos );
    //Mostrar pedido por id
    router.get( '/pedidos/:id',auth, pedidosController.mostrarPedido );
    //Actualizar Pedidos
    router.put( '/pedidos/:id',auth, pedidosController.actualizarPedido )
    //Eliminar Pedidos
    router.delete( '/pedidos/:id', auth,pedidosController.eliminarPedido )


    // ****USUARIOS*****
    router.post( '/crear-cuenta',
        auth,
        usuariosController.registrarUsuario
    );

    router.post( '/iniciar-sesion',
        usuariosController.autenticarUsuario
    );


    return router
}