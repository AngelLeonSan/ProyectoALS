//importo el express y el cors
const express = require('express')
const cors = require('cors')
//importo el fichero login.js que está en la carpeta services
const login = require('./services/login')
//Fichero con el servicio crud
const items = require('./services/articulos');   // servicio CRUD


//Definimos el puerto por que va a escuchar nuestra API las peticiones
const port  = 3030

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())

//Ejemplo para ver cómo funciona un endpoint:
//este endpoint / y devuelve un mensaje
app.get('/', function (req, res) {
    res.json({message: 'API FUNCIONANDO'})
})

//Creación del endpoint: /login
//llama al fichero login.js usando el método getUserData pasándole
//el login (user) y la contraseña (password)
app.get('/login', async function(req, res, next) {
    console.log(req.query)
    console.log(req.query.user)
    console.log(req.query.password)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
})

//ENDPOINT insertar
app.get('/addItem', async (req, res, next) => {
    try {
        const filas = await items.insertar(req);
        //frontend recibira los datos
        res.json(filas);
    } catch (err) {
        console.error('Error /addItem', err.message);
        next(err);
    }
});

//ENDPOINT Obtener datos
app.get('/getItems', async(req, res, next) => {
    try {
        const resultado = await items.obtenerDatos(req);
        //Frontend esperara el numero de filas afectadas
        res.json(resultado)
    } catch (err) {
        next(err);
    }
});

//ENDPOINT Eliminar filas
app.get('/deleteItem', async(req, res, next) => {
    try {
        const resultado = await items.borrarDatos(req);
        //Frontend esperara el numero de filas afectadas
        res.json(resultado)
    } catch (err) {
        next(err);
    }
});



//Iniciamos la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)