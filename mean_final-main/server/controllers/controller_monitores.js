const Monitor = require('../models/monitores');
// import Monitor from '../models/monitores';



// Creamos un objeto que va a contener las funciones.
const monitoresCtrl = {};


// // prueba
// monitoresCtrl.getMonitores = (req, res)=>{
//     res.json({
//         status: 'Monitores van aquí'
//     })
// }

/******** MÉTODOS GET *********/
// GET: Todos los monitores de la base de datos
monitoresCtrl.findAllMonitores = async (req, res) => {
    console.log(req + "\nTodo esta ok");
    const monitores = await Monitor.find();
    res.json(monitores);
};

// GET: Monitor con un id determinado
monitoresCtrl.findByID = async (req, res) => {
    const id = req.params.id;
  
    try {
      const monitor = await Monitor.findById(id);
      if (!monitor) {
        return res.status(404).json({
          status: -1,
          statusText: "Monitor no encontrado"
        });
      }
      res.json(monitor); // Enviamos la respuesta
    } catch (error) {
      console.error("Error al buscar el monitor:", error);
      res.status(500).json({
        status: -1,
        statusText: "Error al buscar el monitor"
      });
    }
  };
/********** Buscar por marca************CAMBIAR*/ 
monitoresCtrl.findMarca = async (req, res) => {
    const marca = req.params.marca;
    try {
        const monitores = await Monitor.find({marca});
        res.json(monitores);    // Enviamos la respuesta
    } 
    catch (error) {
        res.json({
            status: -1,
            statusText: "Marca no encontrada"
        })
    }
};
/********** Buscar por modelo************CAMBIAR*/
monitoresCtrl.findModelo = async (req, res) => {
    const modelo = req.params.modelo;
    try {
        const monitores = await Monitor.find({modelo});
        res.json(monitores);    // Enviamos la respuesta
    } 
    catch (error) {
        res.json({
            status: -1,
            statusText: "Modelo no encontrado"
        })
    }
};

monitoresCtrl.findByTipoPanel = async (req, res) => {
    const tipo_panel = req.params.tipo_panel;
    try {
        const monitores = await Monitor.find({tipo_panel});
        res.json(monitores);    // Enviamos la respuesta
    }
    catch (error) {
        res.json({
            status: -1,
            statusText: "Tipo de panel no encontrado"
        })
    }
};


/********* METODOS POST: ***********/
//POST: Añadir un monitor 
monitoresCtrl.addMonitor = async (req,res) => {
    console.log(req.body);

        
        // De esta forma no funciona bien el angular. No se muy bien el porque.
        // const monitor = new Monitor(req.body); // Creamos un nuevo objeto monitor que recibimos en el body del request 
        
        
    try {
        const monitor = Monitor({ // Creamos un nuevo objeto monitor que recibimos en el body del request 
            marca:          req.body.marca,          
            modelo:         req.body.modelo,
            frecuencia:    req.body.frecuencia,
            descripcion:    req.body.descripcion,
            cantidad:       req.body.cantidad,
            precio:         req.body.precio,
            tipo_panel:     req.body.tipo_panel
        });
        await monitor.save(); // Esto tambien puede tomar bastante tiempo por eso le ponemos el await
        console.log("Ok monitor guardado\n");
        res.json({
            status: "Monitor guardado" // Enviamos un mensaje de estado de guardado
        })
    } 
    catch (error) {
        // Enviamos un mensaje de estado de guardado
        res.json({
            status: -1,
            textStatus: "Algo ha ido mal al guardar un monitor"
        })
    }
}

/*********** MÉTODOS PUT(Update) ***********/
// PUT: Modificar los datos de un monitor determinado
//En los parametros de la búsqueda (req) vamos a poner el id de la película que queramos
monitoresCtrl.updateMonitor = async (req, res) => {
    const { id } = req.params; //Guardamos el id que recibimos por request
    try {
    
        const monitor = {
            marca:          req.body.marca,          
            modelo:         req.body.modelo,
            frecuencia:    req.body.frecuencia,
            descripcion:    req.body.descripcion,
            cantidad:       req.body.cantidad,
            precio:         req.body.precio,
            tipo_panel:     req.body.tipo_panel
        };
        console.log("Hola");
        await Monitor.findByIdAndUpdate(id,{$set: monitor},{new: true}); // El new:true es para que en caso de que no exista lo cree
        res.json({
            status: 0,
            statusText: "Monitor actualizado"
        })
    }
    catch(erro){
        console.log("Actualizar monitor ha fallado");
        res.json({
            satatus: -1,
            statusText: "Fallo al actualizar Monitor" 
        })
    }
};

/******** MÉTODOS DELETE  **********/
//DELETE: Eliminar un monitor determinado 
monitoresCtrl.deleteMonitor = async (req, res) =>{
    await Monitor.findByIdAndRemove(req.params.id);
    res.json({
        status: 0,
        statusText: "Monitor eliminado con exito"
    })
};


// Exportamos el controlador de monitores
module.exports = monitoresCtrl;

    

