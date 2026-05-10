import { configureStore } from '@reduxjs/toolkit'
import reducer from './authSlice'

// 
export const store = configureStore({
reducer: {    
        //Añadimos la configuracion de la store con el reducer creado
    authentication: reducer,
 },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch