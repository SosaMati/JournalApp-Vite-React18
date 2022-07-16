import { configureStore } from '@reduxjs/toolkit'; 
import { authSlice } from './auth';
import { journalSlice } from './journal';


export const store = configureStore({   
  reducer: {  //reducer es un objeto que contiene todos los reducers que vamos a usar en nuestra aplicación
    auth: authSlice.reducer,  
    journal: journalSlice.reducer,
  },
});