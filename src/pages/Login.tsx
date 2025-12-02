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
  const [msg, setMsg] = useState<'ok' | 'error'| ''>('');//Controlamos que alerta se muestra

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()//Evita que se recargue la pagina

    //Mostramos por consola el usuario y la contraseña como se pide
    console.log("Usuario:", usuario);
    console.log("Contraseña:", contra);

    if(usuario === bdUsuario && contra === bdContra) {
      setMsg('ok');
      //Guardamos la info en redux antes de navegar
      dispatch(Acciones.login({
        name: usuario,
        rol: "administrador"
      }))
      setTimeout(() => navigate('/home'), 900); // espera y nos navega a la otra pagina
    } else {
      setMsg('error');
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

            {/* Alertas */}
            {msg === "ok" && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Datos correctos, se le permite acceder
              </Alert>
            )}

            {msg === "error" && (
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
