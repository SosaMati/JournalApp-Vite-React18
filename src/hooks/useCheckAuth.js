import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase/Config";
import { starLoadingNotes } from "../store/journal/thunks";


export const useCheckAuth = () => {
  
    const { status } = useSelector(state => state.auth); // se usa para obtener el estado de autenticacion
    const dispatch = useDispatch();


    useEffect(() => {
    onAuthStateChanged( FirebaseAuth, async( user ) => {
        if ( !user ) return dispatch(  logout() ); // si no hay usuario, se desloguea

        const { uid, email, displayName, photoURL } = user;
        dispatch( login({ uid, email, displayName, photoURL }) ); // si hay usuario, se logea
        dispatch( starLoadingNotes()  ); // se cargan las notas
        
    })
    }, []);

    return {
        status
    }
  
}
