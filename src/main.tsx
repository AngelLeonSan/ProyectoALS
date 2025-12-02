import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import { customTheme } from './theme';
import Login from './pages/Login';

//Importamos el componente Provider de la librearía react-redux
import { Provider } from 'react-redux'
//Importamos el componente store que definimos en el fichero ./store/index
import { store } from './store/index'
//Todo el código que tenían de otras importaciones y el código de createTheme lo dejan como está.
//Finalmente escribimos lo siguiente: lo que está en púrpura es lo que añadí a lo que ya estaba.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <Provider store={store}>
    <App />
    </Provider>
    </ThemeProvider>
  </StrictMode>,
)




