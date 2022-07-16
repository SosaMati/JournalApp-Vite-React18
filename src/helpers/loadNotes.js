import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/Config";



export const loadNotes = async( uid = '' ) => {
    if (!uid) throw new Error ('El UID del usuario no existe');

    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` ); //creo una referencia a la colección de notas
    const docs = await getDocs( collectionRef ); //obtengo los documentos de la colección

    const notes = []; //creo un array para guardar las notas

    docs.forEach( doc => {
        notes.push({ id: doc.id, ...doc.data() }); //agrego cada nota a la lista de notas
    });
   
    return notes; //retorno la lista de notas
    
}
