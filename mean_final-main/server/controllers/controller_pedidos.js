const Pedido = require('../models/pedidos');
// const Pedido = require('mongoose');

// Creamos un objeto que va a contener las funciones.
const pedidosCtrl = {};

/******** MÉTODOS GET *********/
// GET: Todos los pedidos de la base de datos
pedidosCtrl.findAllPedidos = async (req, res) => {
    console.log("Buscando todos los pedidos");
    const pedidos = await Pedido.find();
    res.json(pedidos);

};

// GET: Pedido con un id determinado
pedidosCtrl.findByID = async (req, res) => {
    const id = req.params.id;

    try{
        const pedido = await Pedido.findById(id);
        res.json(pedido); // Enviamos la respuesta
    }
    catch (error) {
        res.json({
            status: -1,
            statusText: "ID no encontrado"
        })
    }
};


pedidosCtrl.findByID_Articulo = async (req, res) => {
    const id_articulo = req.params.id_articulo;

    // Validar que el parámetro id_articulo esté presente
    if (!id_articulo) {
        return res.status(400).json({
            status: -1,
            statusText: "El parámetro id_articulo es obligatorio",
            statusText: req.params.id_articulo + " no encontrado"
        });
    }

    try {
        // Buscar pedidos por id_articulo
        const pedidos = await Pedido.find({ id_articulo });

        // Verificar si se encontraron resultados
        if (pedidos.length === 0) {
            return res.status(404).json({
                status: 0,
                statusText: "No se encontraron pedidos para el id_articulo proporcionado"
            });
        }

        // Enviar los pedidos encontrados
        res.json(pedidos);
    } catch (error) {
        console.error("Error al buscar pedidos por id_articulo:", error);
        res.status(500).json({
            status: -1,
            statusText: "Error al buscar pedidos por id_articulo"
        });
    }
};

pedidosCtrl.findByID_Cliente = async (req, res) => {
    const id_usuario = req.params.id_usuario;
    // Validar que el parámetro id_usuario esté presente
    if (!id_usuario) {
        return res.status(400).json({
            status: -1,
            statusText: "El parámetro id_usuario es obligatorio",
            statusText: req.params.id_usuario + " no encontrado"
        });
    }
    try {
        // Buscar pedidos por id_usuario
        const pedidos = await Pedido.find({ id_usuario });
        // Verificar si se encontraron resultados
        if (pedidos.length === 0) {
            return res.status(404).json({
                status: 0,
                statusText: "No se encontraron pedidos para el id_usuario proporcionado"
            });
        }
        // Enviar los pedidos encontrados
        res.json(pedidos);
    } catch (error) {
        console.error("Error al buscar pedidos por id_usuario:", error);
        res.status(500).json({
            status: -1,
            statusText: "Error al buscar pedidos por id_usuario"
        });
    }
};

pedidosCtrl.findByIdAndCliente = async (req, res) => {
    if (!req.params.id || !req.params.id_usuario) {
      return res.status(400).json({ message: "Faltan parámetros requeridos." });
    }
    try {
      const { id, id_usuario } = req.params;
      const pedido = await Pedido.find({ _id: id, id_usuario: id_usuario });
      if (pedido) {
        res.json(pedido);
      } else {
        res.status(404).json({ message: "No se encontró un pedido con ese ID para el cliente especificado." });
      }
    } catch (error) {
      console.error("Error al buscar el pedido:", error);
      res.status(500).json({ message: "Error al buscar el pedido." });
    }
  };


/********* METODOS POST: ***********/
//POST: Añadir un Pedido 
pedidosCtrl.addPedido = async (req,res) => {
    console.log(req.body);

        
        // De esta forma no funciona bien el angular. No se muy bien el porque.
        // const Pedido = new Pedido(req.body); // Creamos un nuevo objeto Pedido que recibimos en el body del request 
        
        
    try {
        const pedido = new Pedido({ // Creamos un nuevo objeto Pedido que recibimos en el body del request 
            id_usuario:     req.body.id_usuario,
            nombre:        req.body.nombre,
            id_articulo:      req.body.id_articulo,
            cantidad:       req.body.cantidad,
            fecha_pedido:   req.body.fecha_pedido,
            direccion_de_envio: req.body.direccion_de_envio,
            modificado: req.body.modificado  
        });
        const pedidoGuardado = await pedido.save();

        // Devolver el pedido recién creado con un código de estado 201
        res.status(201).json({
            _id: pedidoGuardado._id, // ID del pedido recién creado
            status: "Pedido guardado",
            pedido: pedidoGuardado // Opcional: devolver el objeto completo
        });
    } catch (error) {
        console.error("Error al guardar el pedido:", error);

        // Devolver un mensaje de error con un código de estado 500
        res.status(500).json({
            status: -1,
            textStatus: "Algo ha ido mal al guardar un Pedido"
        });
    }
}

/*********** MÉTODOS PUT(Update) ***********/
// PUT: Modificar los datos de un Pedido determinado
//En los parametros de la búsqueda (req) vamos a poner el id de la monitor que queramos
pedidosCtrl.updatePedido = async (req, res) => {
    const { id } = req.params; //Guardamos el id que recibimos por request
    try {
    
        const pedido = { // Creamos un nuevo objeto Pedido que recibimos en el body del request 
            id_usuario:     req.body.id_usuario,
            nombre:        req.body.nombre,
            id_articulo:      req.body.id_articulo,
            cantidad:       req.body.cantidad,
            fecha_pedido:   req.body.fecha_pedido,  
            direccion_de_envio: req.body.direccion_de_envio,
            modificado: req.body.modificado
        };
        await Pedido.findByIdAndUpdate(id,{$set: pedido},{new: true}); // El new:true es para que en caso de que no exista lo cree
        res.json({
            status: 0,
            statusText: "Pedido actualizado"
        })
    }
    catch(erro){
        console.log("Actualizar Pedido ha fallado");
        res.json({
            satatus: -1,
            statusText: "Fallo al actualizar Pedido" 
        })
    }
};

/******** MÉTODOS DELETE  **********/
//DELETE: Eliminar un Pedido determinado 
pedidosCtrl.deletePedido = async (req, res) =>{
    await Pedido.findByIdAndRemove(req.params.id);
    console.log("Eliminar pedido");
    res.json({
        status: 0,
        statusText: "Pedido eliminado con exito"
    })
};

// Exportamos el controlador de pedidos
module.exports = pedidosCtrl;

    

