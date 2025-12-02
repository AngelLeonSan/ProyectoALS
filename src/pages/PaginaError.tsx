import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function ErrorPage() {
    //Obtenemos el error obtenido en la ruta actual
    //Solo funciona si definimos el errorElement en el router de APP
  const error = useRouteError();

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
        
      <Typography variant="h3" gutterBottom>
        {isRouteErrorResponse(error)
          ? `${error.status} - ${error.statusText}`
          : "Error desconocido"}
      </Typography>

      <Typography gutterBottom>
        {isRouteErrorResponse(error)
          ? String(error.data || "Ha ocurrido un error inesperado.")
          : "La ruta solicitada no existe."}
      </Typography>

      <Link to="/">Volver al Login</Link>
    </Box>
  );
}