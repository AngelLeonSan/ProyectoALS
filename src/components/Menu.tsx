import React, { useState, useEffect } from "react";
//Componentes
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
//Iconos
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { Acciones } from "../store/authSlice"; // tu slice
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
export default function Menu() {
  //iniciamos el navigate y el dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Controlamos si el drawer esta abierto o no
  const [drawerOpen, setdrawerOpen] = useState(false);

  //Desde redux obtenemos los datos de la autentificacion
  const datosUsuario = useSelector((state: any) => state.authentication);
  const identificado = datosUsuario?.isAutenticated;
  const nombre = datosUsuario?.userName || "";

  //Ahora mediante useEffect comprobamos que si no esta autentificado le reenviamos al login
  useEffect(() => {
    if (!identificado) {
      navigate("/");
    }
  }, [identificado, navigate]);

  //Creamos la funcion salir
  const handleLogout = () => {
    dispatch(Acciones.logout());
    navigate("/");
  };

  return (
    <>
      {/* Empezamos con la barra superior*/}
      <AppBar position="static">
        <Toolbar>
          {/*Menu desplegable */}
          <Tooltip title="Abrir menú" placement="bottom" arrow>
            <IconButton color="inherit" onClick={() => setdrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Tooltip>

          {/* Nombre de usuario centrado */}
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            {nombre}
          </Typography>

          {/* Icono alineado a la derecha */}
          <Tooltip title="Perfil de usuario" placement="bottom" arrow>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/*Ahora vamos con el menu lateral */}
      <Drawer open={drawerOpen} onClose={() => setdrawerOpen(false)}>
        <Box sx={{ width: 250 }} onClick={() => setdrawerOpen(false)}>
          <List>
            {/*Opcion de inicio que nos redirije a home */}
            <Link to="/home" style={{ color: "inherit" }}>
              <Tooltip title="Ir a Inicio" placement="right" arrow>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inicio" />
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </Link>

            {/*Opcion de inicio que nos redirije a reports */}
            <Link to="/reports" style={{ color: "inherit" }}>
              <Tooltip title="Ir a Informes" placement="right" arrow>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Informes" />
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </Link>
            {/* Menu de ayuda */}
            <Link
              to="/Manual_Usuario_UT2_4.pdf"
              target="_blank"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Tooltip
                title="Abrir el manual de usuario"
                placement="right"
                arrow
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <HelpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ayuda" />
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </Link>

            {/*Opcion de inicio que nos redirije home */}
            <Tooltip title="Cerrar sesión" placement="right" arrow>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Salir" />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
