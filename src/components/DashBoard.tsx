import React, { useEffect, useState } from "react";
import {Box, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton} from "@mui/material";
//Icono de eliminar
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

//Le pasamos los tipos de datos de la base de datos
interface TipoDatos {
    id?: number;
    nombre: string;
    marca: string;
    tipo: string
    precio: number
}

//Estado inicial del formulario es decir vacio
const estadoInicial: TipoDatos = {
    nombre: "",
    marca: "",
    tipo: "",
    precio: 0
};

export default function DashBoard() {
    //Estado del formulario y de la tabla
    const [item, setItem] = useState<TipoDatos>(estadoInicial); // formulario
  const [tableData, setTableData] = useState<TipoDatos[]>([]); // tabla

  //Ponemos la url del backEnd 
  const URL = "http://localhost:3030";

  //Ahora creamos la funcion listar
   const listar = async () => {
    try {
      const resp = await fetch(`${URL}/getItems`);
      const json = await resp.json();

      
      setTableData(json.data || []);
    } catch (error) {
      console.error("Error al listar:", error);
      alert("No se pudo completar la lista");
    }
  };

  //Cargamos los datos al montar el componente
  useEffect(() => {
    listar
  }, [])

  //Funcion insertar
   const insertar = async () => {
    const params = new URLSearchParams({
      nombre: item.nombre,
      marca: item.marca,
      tipo: item.tipo,
      precio: String(item.precio)
    });

    try {
      const respuesta = await fetch(`${URL}/addItem?${params}`);
      const json = await respuesta.json();

      //Si devuelve mayor a 0 se inserta
      return json;
    } catch (error) {
      console.error("Error insertando:", error);
      throw error;
    }
  };

  //Funcion borrar
   const borrar = async (id: number) => {
    try {
      const resp = await fetch(`${URL}/deleteItem?id=${id}`);
      const json = await resp.json();
      return json;
    } catch (error) {
      console.error("Error borrando:", error);
      throw error;
    }
  };

  //Funcion que controla la recarga de la pagina y la validacion de campos
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validamos que los campos esten rellenados
    if (!item.nombre.trim() || !item.marca.trim() || !item.tipo.trim()) {
      alert("Rellene todos los campos correctamente");
      return;
    }

    try {
      await insertar();
      alert("Datos insertados correctamente");

      // Vaciamosformulario
      setItem(estadoInicial);

      // Refresca la table
      await listar();
    } catch {
      alert("No se pudieron insertar los datos");
    }
  };

  //Funcion que borra un registro
  const handleDelete = async (id?: number) => {
    if (!id) return;
    //Pregunta si quieres borrar el registro
    if (!confirm("Quieres borrar el resgistro?")) return;

    try {
      await borrar(id);
      alert("Eliminado");
      await listar();
    } catch {
      alert("No se ha podido borrar");
    }
  };
  //Interfaz del crud
  return (
    <>
     <Box sx={{ p: 2 }}>
      {/* Insercion de datos */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          
          <TextField
            fullWidth
            label="Nombre"
            margin="normal"
            value={item.nombre}
            onChange={(e) => setItem({ ...item, nombre: e.target.value })}
          />

          <TextField
            fullWidth
            label="Marca"
            margin="normal"
            value={item.marca}
            onChange={(e) => setItem({ ...item, marca: e.target.value })}
          />

          <TextField
            fullWidth
            label="Tipo"
            margin="normal"
            value={item.tipo}
            onChange={(e) => setItem({ ...item, tipo: e.target.value })}
          />

          <TextField
            fullWidth
            type="number"
            label="Precio"
            margin="normal"
            inputProps={{ min: 0 }}
            value={item.precio}
            onChange={(e) => setItem({ ...item, precio: Number(e.target.value) })}
          />

          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            + Insertar
          </Button>
        </Box>
      </Paper>

      {/* Lista */}
      <TableContainer component={Paper}>
        <Table aria-label="Tabla CRUD">
          <TableHead>
            {/*Titulos de las columnas*/}
            <TableRow>
              <TableCell>Acciones</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.length === 0 ? (
              <TableRow>
                {/*Muestra mensaje si no hay datos */}
                <TableCell colSpan={5} align="center">
                  No hay datos
                </TableCell>
                {/* Si hay datos los muestra */}
              </TableRow>
            ) : (
              tableData.map((row) => (
                <TableRow key={row.id}>
                    {/*En la columna de acciones ponemos el boton borrar */}
                  <TableCell>
                    <IconButton color="error" onClick={() => handleDelete(row.id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                    {/*Mostramos los datos */}
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.marca}</TableCell>
                  <TableCell>{row.tipo}</TableCell>
                  <TableCell>{row.precio}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
    </>
  )

}
