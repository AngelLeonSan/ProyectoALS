import React, { useEffect, useMemo, useState } from 'react';
import MaterialTable, { type Column } from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Datos que usaremos
interface Item {
  id?: number;       
  nombre: string;    
  marca: string;     
  tipo: string;      
  precio: number;   
}

// 
export default function InformeColeccion({ data }: { data: Item[] }) {

  // Accedemos al tema
  const theme = useTheme();

  // Creamos las columnas de la tabla
  const columns: Array<Column<Item>> = [
    { title: 'Nombre', field: 'nombre', filtering: false }, // columna nombre, no filtrable
    { title: 'Marca', field: 'marca', filtering: true },    // columna marca, filtrable
    { title: 'Tipo', field: 'tipo', filtering: true },      // columna tipo, filtrable
    { title: 'Precio', field: 'precio', type: 'numeric', filtering: false } // columna precio, tipo numérico
  ];

  // Se calcula el total de precio
  const totalPrecio = useMemo(() => {
    // Se suman trodos los precios
    return data.reduce((acc, cur) => acc + (Number(cur.precio) || 0), 0);
  }, [data]);

  return (
    <Box sx={{ mt: 3, p: 2 }}> 
      
      {/* Creamos la tabla */}
      <MaterialTable
        title="Informe — Colección"  // Título
        columns={columns}             // Columnas que definimos arriba
        data={data}                   // Datos del back

        options={{
          draggable: true,            
          paging: true,               
          pageSize: 10,               
          columnsButton: true,        
          filtering: true,            

          exportMenu: [               
            {
              label: 'Exportar CSV',  // Texto del boton CSV
              exportFunc: (cols, rows) => ExportCsv(cols, rows, 'informe_coleccion') // Exportar CSV
            },
            {
              label: 'Exportar PDF',  // Texto del boton pdf
              exportFunc: (cols, rows) => ExportPdf(cols, rows, 'informe_coleccion') // Exportar PDF
            }
          ],

          headerStyle: {              
            backgroundColor: theme.palette.primary.main,           
            color: theme.palette.primary.contrastText            
          },

          showTitle: true,            
        }}
      />

      {/* Debajo de la tabla mostramos el total de precios */}
      <Box sx={{ mt: 2, textAlign: 'right' }}> 
        <Typography variant="h6">
          Total precio: {totalPrecio.toFixed(2)} € 
        </Typography>
      </Box>
    </Box>
  );
}