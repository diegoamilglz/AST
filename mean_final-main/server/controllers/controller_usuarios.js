const Usuario = require('../models/usuarios');
// const Usuario = require('mongoose');


// Creamos un objeto que va a contener las funciones.
const usuariosCtrl = {};

/******** MÉTODOS GET *********/
// GET: Todos los usuarios de la base de datos
usuariosCtrl.findAllusuarios = async (req, res) => {
    console.log("Buscando todos los articulos");
    const usuarios = await Usuario.find();
    res.json(usuarios);

};

// GET: Usuario con un id determinado
usuariosCtrl.findByID = async (req, res) => {
    const id = req.params.id;

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            // Si no se encuentra el usuario, devolvemos un código 404
            return res.status(404).json({
                status: -1,
                statusText: "Usuario no encontrado"
            });
        }
        // Si se encuentra el usuario, devolvemos el usuario con un código 200
        res.json(usuario);
    } catch (error) {
        console.error("Error al buscar el usuario:", error);
        // Si ocurre un error en el servidor, devolvemos un código 500
        res.status(500).json({
            status: -1,
            statusText: "Error al buscar el usuario"
        });
    }
};


/********** Buscar por nombre*************/
usuariosCtrl.findNombre = async (req, res) => {
    console.log("Nombre de usuario");
    const nombre = req.params.nombre;
    try {
        const usuarios = await Usuario.find({nombre});
        res.json(usuarios);    // Enviamos la respuesta
    } 
    catch (error) {
        res.json({
            status: -1,
            statusText: "Marca no encontrada"
        })
    }
};

/********** Buscar por id devolviendo solo el rol*************/
usuariosCtrl.findRol = async (req, res) => {
    console.log("Rol de usuario");
    const id = req.params.id;
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({
                status: -1,
                statusText: "Usuario no encontrado"
            });
        }

        res.json({ role: usuario.role });
    } catch (error) {
        console.error("Error al buscar el rol del usuario:", error);
        res.status(500).json({
            status: -1,
            statusText: "Error al buscar el rol del usuario"
        });
    }
};

/********** Buscar por rol*************/
usuariosCtrl.findByRole = async (req, res) => {
    console.log("Buscando usuarios por rol");
    const role = req.params.role;
    console.log(role);
    try {
        let usuarios;
        usuarios = await Usuario.find({ role: role });
        

        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({
                status: -1,
                statusText: "No se encontraron usuarios con el rol especificado"
            });
        }
        res.json(usuarios); 
    } catch (error) {
        console.error("Error al buscar usuarios por rol:", error);
        res.status(500).json({
            status: -1,
            statusText: "Error al buscar usuarios por rol"
        });
    }
};

/********* METODOS POST: ***********/
//POST: Añadir un Usuario 
usuariosCtrl.addUsuario = async (req,res) => {
    console.log(req.body + "\n Añadiendo usuario");

        
        // De esta forma no funciona bien el angular. No se muy bien el porque.
        // const Usuario = new Usuario(req.body); // Creamos un nuevo objeto Usuario que recibimos en el body del request 

        
    try {
        // console.log(req);
        const usuario = new Usuario({ // Creamos un nuevo objeto Usuario que recibimos en el body del request 
            nombre:         req.body.nombre,
            role:           req.body.role
        });
        console.log("llego usuario");
        usuarioGuardado = await usuario.save(); // Esto tambien puede tomar bastante tiempo por eso le ponemos el await
        console.log("llego usuario"+ usuarioGuardado);
        const usuarioConIdString = {
            ...usuarioGuardado.toObject(),
            _id: usuarioGuardado._id.toString()
        };
        console.log("llego usuario", usuarioConIdString);
        res.json({usuarioConIdString}); // Enviamos la respuesta
    } 
    catch (error) {
        // Enviamos un mensaje de estado de guardado
        res.json({
            status: -1,
            textStatus: "Algo ha ido mal al guardar un Usuario"
        })
    }
}

/*********** MÉTODOS PUT(Update) ***********/
// PUT: Modificar los datos de un Usuario determinado
//En los parametros de la búsqueda (req) vamos a poner el id de la película que queramos
usuariosCtrl.updateUsuario = async (req, res) => {
    console.log("Update usuario");
    const { id } = req.params; //Guardamos el id que recibimos por request
    try {
        
        const usuario = { // Creamos un nuevo objeto Usuario que recibimos en el body del request 
            nombre:         req.body.nombre,
            role:           req.body.role
        };
        
        await Usuario.findByIdAndUpdate(id,{$set: usuario},{new: true}); // El new:true es para que en caso de que no exista lo cree
        res.json({
            status: 0,
            statusText: "Usuario actualizado"
        })
    }
    catch(erro){
        console.log("Actualizar Usuario ha fallado");
        res.json({
            satatus: -1,
            statusText: "Fallo al actualizar Usuario" 
        })
    }
};

/******** MÉTODOS DELETE  **********/
//DELETE: Eliminar un Usuario determinado 
usuariosCtrl.deleteUsuario = async (req, res) =>{
    await Usuario.findByIdAndRemove(req.params.id);
    res.json({
        status: 0,
        statusText: "Usuario eliminado con exito"
    })
};










// Exportamos el controlador de usuarios
module.exports = usuariosCtrl;

    

