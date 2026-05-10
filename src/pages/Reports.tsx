import { Typography, Box, Button } from "@mui/material";
import Menu from "../components/Menu";
import { useState } from "react";
import InformeColeccion from "../components/InformeColeccion"

export default function Reports() {
  //Constante que recibe si se pulsa o no el boton
  const [mostrarInformes, setMostrarInformes] = useState(false);
  //Estado que almacena los datos de la BD
  const [datosBD, setDatosBD] = useState([])

  //Le pasamos la url del back
  const URL = "http://localhost:3030";

  //Abrimos una funcion que obtendra los datos desde lback
  const obtenerDatosBack = async () => {
    try {
      //Peticion al backend con los datos
      const peticion = await fetch(`${URL}/getItems`);
      //Lo pasamos a json
      const json = await peticion.json();

      //Guardamos los datos en el estado y cambiamos a true el estado del informe
      setDatosBD(json.data || []);
      setMostrarInformes(true);
      //Si hay error nos lo mostrara por la consola
    } catch (error) {
      console.error("Error ->" , error);
      alert("No se han recuperado los datos")
    }
  };



  return (
    <>
    <Menu />
    <Box sx={{ p: 4 }}>
      <Typography variant="h3">Página Reports de Ángel León Santana</Typography>
    
    {/*Ahora iniciaremos el boton de generar informes */}
    <Button 
    variant="contained"
    sx={{mt: 2, display: 'flex', justifyContent: 'center'}}
    onClick={obtenerDatosBack}>
      Informe Coleccion 
      </Button>
 {/* Se renderizara el informe al pulsar el boton*/}
        {mostrarInformes && (
          <Box sx={{ mt: 4 }}>
            <InformeColeccion data={datosBD} />
          </Box>
        )}

    </Box>
    </>
  );
}
