import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./Config";


const googleProvider =  new GoogleAuthProvider();



export const singInWithGoogle = async() => {

    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result ); 

        const { displayName, email, photoURL, uid } = result.user; //obtenemos el usuario de firebase y lo guardamos en un objeto  
        
        return {
            ok: true,
            // user info:
            displayName, email, photoURL, uid //el usuario que se logueo
        }
        
    } catch (error) {
        
        const errorCode = error.code; //obtenemos el codigo de error de firebase 
        const errorMessage = error.message; //obtenemos el mensaje de error de firebase

        return {
            ok: false,
            errorMessage, 
        }
    }
}


export const registerWithEmailPassword = async({ email, password, displayName  }) => { //recibimos un objeto con los datos del usuario

    try {

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password ); //creamos el usuario con firebase
        const { uid, photoURL } = resp.user; //obtenemos el usuario de firebase y lo guardamos en un objeto
       
        await updateProfile( FirebaseAuth.currentUser, { displayName } );  //actualizamos el perfil del usuario

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}


export const loginWithEmailPassword = async({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password ); //creamos el usuario con firebase
        const { uid, photoURL, displayName } = resp.user; //obtenemos el usuario de firebase y lo guardamos en un objeto
        return {
            ok: true,
            uid, photoURL, displayName, email
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}


export const logoutFirebase = async() => {

    return await FirebaseAuth.signOut(); //cerramos la sesion de firebase  
}
