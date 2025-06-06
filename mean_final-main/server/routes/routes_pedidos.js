const express = require('express');

// Obtenemos el objeto router de la funcion de express Router()
const router = express.Router();


//  Requerimos los controladores
const pedidosCtrl = require('../controllers/controller_pedidos');




/****** RUTAS PARA LAS FUNCIONES DEL FICHERO CONTROLLER.JS: *******/
// Devolver todos los Pedidos
router.get('/', pedidosCtrl.findAllPedidos);
// Devolver un pedidoe con un ID determinado
router.get('/id/:id', pedidosCtrl.findByID);
// Añadir un pedidoe
router.post('/', pedidosCtrl.addPedido);
// Modificar los datos de un pedidoe con un ID determinado
router.put('/:id', pedidosCtrl.updatePedido);
// Eliminar un pedidoe con un ID determinado
router.delete('/:id', pedidosCtrl.deletePedido);


// Busacar por id
router.get('/id_articulo/:id_articulo', pedidosCtrl.findByID_Articulo);
router.get('/cliente/:id_usuario', pedidosCtrl.findByID_Cliente);
router.get('/clientes/:id/:id_usuario', pedidosCtrl.findByIdAndCliente);


// Exportamos el router
module.exports = router;