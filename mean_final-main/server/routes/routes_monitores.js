const express = require('express');

// Obtenemos el objeto router de la funcion de express Router()
const router = express.Router();


//  Requerimos los controladores
const monitoresCtrl = require('../controllers/controller_monitores');




/****** RUTAS PARA LAS FUNCIONES DEL FICHERO CONTROLLER.JS: *******/
// Devolver todos los Monitores
router.get('/', monitoresCtrl.findAllMonitores);
// Devolver un monitor con un ID determinado
// router.get('/:id', monitoresCtrl.findByID);
// Añadir un monitor
router.post('/', monitoresCtrl.addMonitor);
// Modificar los datos de un monitor con un ID determinado
router.put('/:id', monitoresCtrl.updateMonitor);
// Eliminar un monitor con un ID determinado
router.delete('/:id', monitoresCtrl.deleteMonitor);

// Buscar por marca CAMBIAR
router.get('/marca/:marca', monitoresCtrl.findMarca);

// Buscar por id 
router.get('/id/:id', monitoresCtrl.findByID);

// Buscar por modelo CAMBIAR
router.get('/modelo/:modelo', monitoresCtrl.findModelo);

router.get('/tipo_panel/:tipo_panel', monitoresCtrl.findByTipoPanel);



// Rutas para los usuarios


// Exportamos el router
module.exports = router;