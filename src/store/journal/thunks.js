import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/Config';
import { fileUpload, loadNotes } from '../../helpers';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';


export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( savingNewNote() );  //seteo el estado de guardando una nueva nota en true

        const { uid } = getState().auth; //busco el uid del usuario logueado en el state de auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(), 
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) ) //creo un nuevo documento en la colección de notas
        await setDoc( newDoc, newNote ) //seteo el nuevo documento con los datos de la nueva nota

        newNote.id = newDoc.id //seteo el id del documento creado en el id de la nueva nota
        
        dispatch( addNewEmptyNote( newNote ) ) //dispatcheo la acción de agregar una nueva nota vacía

        dispatch( setActiveNote( newNote ) ) //dispatcheo la acción de setear la nota activa
    }
}


export const starLoadingNotes = () => { 
    return async (dispatch, getState) => { 
        const { uid } = getState().auth; //busco el uid del usuario logueado en el state de auth
        if ( !uid ) throw new Error('El UID del usuario no existe'); //si no hay usuario logueado, lanzo un error
        
        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );
    }
}


export const startSaveNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth; 
        const { active:note } = getState().journal; //busco el uid del usuario logueado en el state de auth

        const noteToFirestore = { ...note }; //creo una copia de la nota activa
        delete noteToFirestore.id; //elimino el id del documento

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` ) //busco el documento en la colección de notas

        await setDoc( docRef, noteToFirestore, { merge: true} ) //seteo el documento con los datos de la nota activa

        dispatch( updateNote( note ) ); //dispatcheo la acción de actualizar la nota activa
    }
}


export const startUploadingFiles = ( files = [] ) => {
    return async ( dispatch ) => {
        dispatch( setSaving() ); 

        // await fileUpload( files[0] );
        const fileUploadPromises = []; //creo un array de promesas
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) ); //agrego las promesas de cada archivo a la array de promesas
        }
            const photosUrls = await Promise.all( fileUploadPromises ); //espero a que todas las promesas se resuelvan
            dispatch( setPhotosToActiveNote( photosUrls ) ); //dispatcheo la acción de setear las fotos de la nota activa
    }
}

export const startDeletingNote = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth; //busco el uid del usuario logueado en el state de auth
        const { active: note } = getState().journal; //busco la nota activa en el state de journal
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` ) //busco el documento en la colección de notas
        await deleteDoc( docRef ); //elimino el documento

        dispatch( deleteNoteById( note.id ) ); //dispatcheo la acción de actualizar la nota activa
    }
}
