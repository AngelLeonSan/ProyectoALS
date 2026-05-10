import { Typography, Box } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { Acciones } from '../store/authSlice'
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu"
import DashBoard from "../components/DashBoard";

export default function Home() {
  //Inicializamos el dispatch y el navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Obtenemos datos
  const datos = useSelector((state: any) => state.authentication);

  //Mostramos por consola los datos como pide
  console.log("Datos del store: " + datos?.userName  + " , "  + datos?.userRol);

  //Funcion que cierra la sesion y navega
  const cierreSesion = () => {
    dispatch(Acciones.logout());
    navigate('/');
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3">
        Bievenido {datos?.userName || ''} con Rol: {datos?.userRol || ''}
      </Typography>

      {/* Menu superior*/}
      <Menu />

      {/* Contenido*/}
      <DashBoard/>
    </Box>
  );
}
