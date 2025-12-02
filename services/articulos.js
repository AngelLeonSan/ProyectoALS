
const bd = require('./db');

//Funcion que inserta
async function insertar(req) {
  const data = req.query;
  //Comprobamos que haya datos
  if (!data.nombre || !data.marca || !data.tipo || data.precio === undefined) {
    return { ok: false, message: 'Faltan campos' };
  }
  //ejecutamos la sentencia que inserta los datos
  const sentencia = `INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)`;
  const datos = [data.nombre, data.marca, data.tipo, data.precio];
  //Nos devuelve el resultado
  const result = await bd.query(sentencia, datos); 
  // Nos dice el numero de filas que se afectaron
return { affectedRows: result.affectedRows || 0 };
}

//Metodo para obtener y posteriormente mostrar los datos
async function obtenerDatos(req) {
    //Sentencia que selecciona los datos de la base de datos
    const filas = await bd.query('SELECT id, nombre, marca , tipo , precio FROM coleccion ORDER BY id DESC' );
    return { data : filas || []}
}

//Metodo para borrar dato
async function borrarDatos(req) {
    //Almacenamos el id que nos pasan
    const { id} = req.query;
    //Comprobamos que haya datos
    if (!id) return { affectedRows: 0, message: 'Introduce un id'};
    //Declaramos que borre la fila segun el id introducido por el usuario
    const sentencia = 'DELETE FROM coleccion WHERE id = ?';
    //Ejecuta la sentencia y manda como parametros el id introducido por el usuario
    const resultado = await bd.query(sentencia, [id]);
    //Devolvemos las filas afectadas
      return { 
        affectedRows: resultado.affectedRows ?? 0 
    };

  }

  module.exports = {
    insertar,
    obtenerDatos,
    borrarDatos
};

