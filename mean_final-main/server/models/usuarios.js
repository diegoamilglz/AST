var mongoose_usuarios = require('mongoose');
const {Schema} = mongoose_usuarios;//Schema que va a modelar el objeto en la base de datos

// La serie va a ser un numero esquema de Mongoose


var usuario = new Schema({
    nombre: String,
    role:{
        type:		String,
        enum:		['Administrador', 'Cliente'],
        required:   true
    }
});


// Exportarlo como module para poderlo utilizar en otro archivo

const Usuario = mongoose_usuarios.model('Usuario', usuario);

module.exports = Usuario;    //Nombre del modulo