import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({  
    name: 'auth',  //name es el nombre del slice 
    initialState: {   //initialState es un objeto que contiene todos los estados que vamos a usar en nuestra aplicación
        status: 'checking',  // not-authenticated, checking, authenticated (checking es el estado inicial) 
        uid: null,  //uid es el id del usuario que está autenticado
        email: null,  //email es el email del usuario que está autenticado
        displayName: null,  //displayName es el nombre del usuario que está autenticado
        photoURL: null,  //photoURL es la url de la foto del usuario que está autenticado 
        errorMessage: null,  //errorMessage es el mensaje de error que se muestra en el caso de que no se pueda autenticar
    },
    reducers: { 
        login: (state, { payload }) => { 
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName; 
            state.photoURL = payload.photoURL;
            state.errorMessage = null; 
   
        },
        logout: (state, { payload }) => {
           state.status = 'not-authenticated';
           state.uid = null;
           state.email = null;
           state.displayName = null; 
           state.photoURL = null;
           state.errorMessage = payload?.errorMessage; //errorMessage es el mensaje de error que se muestra en el caso de que no se pueda autenticar
        },
        checkingCredentials: (state) => {
            state.status = 'checking'; 
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;