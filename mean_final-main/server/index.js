const express = require('express');
const app = express();

// Consultar readme.md
const morgan = require('morgan');

const cors = require('cors');


// requerimos la conexion con la base de datos
const { mongoose_monitores } = require('./database'); // Al usar los {} solo obtenemos la conexion que le llamamos mongoose y no todo el  fichero

//////////////////// setings
// El set se usa para crear una variable que va a poder ser accedida desde cualquier parte de mi aplicacion
app.set('port',process.env.PORT || 3000) // Es decir aquí creamos una variable port que se le va a asignar 3000 o en caso de que no pueda uno del sistema


//////////////////// Midlewares
// El middleware lo que hace es que cada vez que llega una peticion pasa primero por el middleware
// le pasamos el parametro dev que simplemente es para ver los mensajes por consola
app.use(morgan('dev'));

// app.use(cors({ origin:'http://localhost:4200'}));
app.use(cors());



// Formato json
app.use(express.json()); // Antes se usaba el bodyparser este es mas moderno

// Conectar a base de datos

//////////////////// Routes
// Ahora aqui lo que hacemos es decirle a nuestra aplicacion que use las rutas que estan en el fichero de routes
app.use('/monitores',require('./routes/routes_monitores')); // lo de /monitores es para que añada ese prefijo siempre y asi no tener que ponerlo en cada ruta
app.use('/pedidos',require('./routes/routes_pedidos')); 
app.use('/usuarios',require('./routes/routes_usuarios')); 



// Starting server
app.listen(app.get('port'), () => {
    console.log("Server listening on port " + app.get('port'));
})

