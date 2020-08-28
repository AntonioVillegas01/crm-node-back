const express = require('express');
const router = express.Router();


const clienteController = require( '../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

module.exports =  function(  ){

    // ****** CLIENTES ******

    //Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente);
    //Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);
    //Muestra a un cliente en especifico
    router.get('/clientes/:id',clienteController.mostrarCliente);
    //Actualizar Cliente
    router.put('/clientes/:id', clienteController.actualizarCliente);
    //Eliminar Cliente
    router.delete('/clientes/:id', clienteController.eliminarCliente);


    // ****** PRODUCTOS ******

    //Agrega un Producto
    router.post('/productos',
        productosController.subirArchivo,
        productosController.nuevoProducto
    );
    //Obtener todos los productos
    router.get('/productos', productosController.mostrarProductos);
    //Obtener producto por id
    router.get('/productos/:id', productosController.mostrarProducto);
    //Actualizar un producto
    router.put('/productos/:id',
        productosController.subirArchivo,
        productosController.actualizarProducto
    );
    //Eliminar Productos
    router.delete('/productos/:id', productosController.eliminarProducto);

    //Busqueda de Productos
    router.post('/productos/busqueda/:query', productosController.buscarProducto)



    // ****** Pedidos ******

    //Agrega un Pedido
    router.post('/pedidos/nuevo/:id', pedidosController.nuevoPedido);
    //Mostrar todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);
    //Mostrar pedido por id
    router.get('/pedidos/:id', pedidosController.mostrarPedido);
    //Actualizar Pedidos
    router.put('/pedidos/:id', pedidosController.actualizarPedido)
    //Eliminar Pedidos
    router.delete('/pedidos/:id', pedidosController.eliminarPedido)




    return router
}