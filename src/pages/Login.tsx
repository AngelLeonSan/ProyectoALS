import { Typography, Button, Box, TextField, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Acciones } from '../store/authSlice';
import { useDispatch } from 'react-redux';

export default function Login() {
  //Definimos la funcion dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Constantes que simulan la informacion de inicio de sesion
  const bdUsuario = "angel";
  const bdContra = "6767";

  const [usuario , setUsuario] = useState(""); //Este y el de abajo son para almacenar los datos
  const [contra, setContra] = useState('');
  const [msg, setMsg] = useState(false);//Controlamos que alerta se muestra

//Funcion que se encarga de conectar con la BD 
  const handleLogin = async  (e: React.FormEvent) => {
  e.preventDefault();

  try {
    //Le pedimos al servidor que nos envie la contraseña y el usuario
    const respBack = await fetch(`http://localhost:3030/login?user=${usuario}&password=${contra}`);
    //Convertimos la respuesta en json con los datos que nos ha devuelto e lback
    const json = await respBack.json();

    //Comprobamos que json exista y que tenga la propiedad nombre
    if (json && json.nombre) {
      //Guardamos los datos del usuario que ha iniciado sesion
      dispatch(
        Acciones.login({
          name: json.nombre,
          rol: json.rol
        })
      );
      //Comprobaciones 
      setMsg(false);
      navigate('/home');
    } else {
      setMsg(true);
    }

  } catch (err) {
    console.error('Error conectando al servidor', err);
    setMsg(true);
  }
};

  return (
    <>
      <Box component="header" sx={{ p:2 }} aria-label="Encabezado Angel"></Box>

      <Box component="main" sx={{ py:4 }} aria-label="Contenido principal">
        <Typography variant='h3' component="h1" gutterBottom>
          Pagina login CRUD ANGEL LEON
        </Typography>

        <Typography variant='h4' component="h2" gutterBottom>
          Acceso de usuarios mediante autentificacion 
        </Typography>
  
        <Box component="form" noValidate onSubmit={handleLogin} aria-label='Formulario Login' sx={{mt : 3}}>
          <TextField 
            required
            fullWidth
            id="usuario"
            label="Usuario"
            name='usuario'
            autoComplete='usuario'
            margin='normal'
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <TextField 
            required
            fullWidth
            name='Contraseña'
            label="Contraseña "
            type='password'
            id='Contraseña'
            autoComplete='current-password'
            margin='normal'
            value={contra}
            onChange={(e) => setContra(e.target.value)}
          />

          {/* Boton que inicia sesion */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Inicio de sesion
            </Button>

            

            {msg && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Usuario o contraseña incorrectos vuelva a intentarlo :3
              </Alert>
            )} 
          </Box>
        </Box>
      </Box>
    </>
  );
}
