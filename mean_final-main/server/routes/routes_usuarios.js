const express = require('express');

// Obtenemos el objeto router de la funcion de express Router()
const router = express.Router();


//  Requerimos los controladores
const usuariosCtrl = require('../controllers/controller_usuarios');




/****** RUTAS PARA LAS FUNCIONES DEL FICHERO CONTROLLER.JS: *******/
// Devolver todos los Pedidos
router.get('/', usuariosCtrl.findAllusuarios);

// Comprueba si el usuario existe 
// router.get('/:check-id', usurariosCtrl.findByID);
// Añadir un monitor
router.post('/', usuariosCtrl.addUsuario);
// Modificar los datos de un monitor con un ID determinado
router.put('/:id', usuariosCtrl.updateUsuario);
// Eliminar un monitor con un ID determinado
router.delete('/:id', usuariosCtrl.deleteUsuario);


// Busacar por id
router.get('/nombre/:nombre', usuariosCtrl.findNombre);
// Devolver un usuario con un ID determinado
router.get('/id/:id', usuariosCtrl.findByID);
// Devolver un rol con un ID determinado
router.get('/role/:id', usuariosCtrl.findRol);
// Buscar usuarios por rol
router.get('/roles/:role', usuariosCtrl.findByRole);


// Rutas para los usuarios


// Exportamos el router
module.exports = router;