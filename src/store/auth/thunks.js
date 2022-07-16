import { loginWithEmailPassword, logoutFirebase, registerWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = ( email, password ) => { //checkingAuthentication es una función que se ejecuta cuando se hace un login
    return async ( dispatch ) => { 
         
        dispatch( checkingCredentials() ); //dispatch es una función que se usa para ejecutar una acción 
    }
}


export const startGoogleSignIn = () => { //startGoogleSignIn es una función que se ejecuta cuando se hace un login con google
    return async ( dispatch ) => {
        
        dispatch( checkingCredentials() ); 

        const result = await singInWithGoogle(); //obtenemos el resultado de la funcion singInWithGoogle
        if( !result.ok ) return dispatch ( logout( result.errorMessage ) );  //si el resultado no es ok, entonces se ejecuta la funcion logout

        dispatch( login( result ) ); //si el resultado es ok, entonces se ejecuta la funcion login
    }
}


export const starCreatingUserWithEmailPassword = ( { email, password, displayName }) => { //starCreatingUserWithEmailPassword es una función que se ejecuta cuando se hace un registro
    return async ( dispatch ) => {
            
        dispatch( checkingCredentials() ); 

        const { ok, uid, photoURL, errorMessage } = await registerWithEmailPassword( { email, password, displayName } ); //obtenemos el resultado de la funcion registerWithEmailPassword
        
        if( !ok ) return dispatch ( logout({ errorMessage }) );  //si el resultado no es ok, entonces se ejecuta la funcion logout

        dispatch( login( { uid, displayName, email, photoURL } ) ); //si el resultado es ok, entonces se ejecuta la funcion login
    }
}


export const startLoginWithEmailPassword = ( { email, password } ) => { //startLoginWithEmailPassword es una función que se ejecuta cuando se hace un login
    return async ( dispatch ) => {

        dispatch( checkingCredentials() ); 

        const result = await loginWithEmailPassword( { email, password } ); //obtenemos el resultado de la funcion loginWithEmailPassword
        
        console.log( result );
        if( !result.ok ) return dispatch ( logout( result ) );  //si el resultado no es ok, entonces se ejecuta la funcion logout
        
        dispatch( login( result ) ); //si el resultado es ok, entonces se ejecuta la funcion login
    }
}


export const startLogout = () => { //startLogout es una función que se ejecuta cuando se hace un logout
    return async ( dispatch ) => {
        await logoutFirebase(); //obtenemos el resultado de la funcion logoutFirebase
        dispatch( clearNotesLogout() ); //se ejecuta la funcion clearNotesLogout))
        dispatch( logout() ); //si el resultado es ok, entonces se ejecuta la funcion logout
    }
}

