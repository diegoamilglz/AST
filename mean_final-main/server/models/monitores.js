var mongoose_monitores = require('mongoose');
const {Schema} = mongoose_monitores;//Schema que va a modelar el objeto en la base de datos

// La serie va a ser un numero esquema de Mongoose


var monitor = new Schema({
    marca:         {type: String, required: true},
    modelo:         String,
    tipo_panel:{
        type:       String,
        enum:       ['TN', 'VA', 'IPS', 'OLED']
    },
    frecuencia:    Number,
    descripcion:   String,
    cantidad:       Number,
    precio:         Number    
});


// Exportarlo como module para poderlo utilizar en otro archivo

const Monitores = mongoose_monitores.model('Monitor', monitor);

module.exports = Monitores;    //Nombre del modulo