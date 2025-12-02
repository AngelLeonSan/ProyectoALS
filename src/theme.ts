import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
      palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#0066ffb2',
      paper: '#43c913ff',
    },
    text: {
      primary: '#000000ff',
    },
  },
})