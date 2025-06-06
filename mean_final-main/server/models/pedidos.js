var mongoose_pedidos = require('mongoose');
const {Schema} = mongoose_pedidos;//Schema que va a modelar el objeto en la base de datos

// La serie va a ser un numero esquema de Mongoose


var pedido = new Schema({
    id_usuario:     String,
    nombre:        String,
    id_articulo:	String,
    cantidad:	    Number,
    fecha_pedido:	{
        type: Date, 
        default: Date.now    
    },
    direccion_de_envio: String,
    modificado: Number
});


// Exportarlo como module para poderlo utilizar en otro archivo

const Pedido = mongoose_pedidos.model('Pedido', pedido);

module.exports = Pedido; //Nombre del modulo