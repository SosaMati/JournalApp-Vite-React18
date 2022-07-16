import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [], 
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 123456,
        //     imageUrl: '',  
        // }
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true; //seteo el estado de guardando una nueva nota en true
        },

        addNewEmptyNote: (state, action ) => {
            state.notes.push( action.payload ) //agrega una nueva nota vacía al array de notas
            state.isSaving = false; //se desactiva el estado de guardado
        },

        setActiveNote: (state, action) => {
            state.active = action.payload; //setea la nota activa 
            state.messageSaved = ''; //se limpia el mensaje de guardado
        },

        setNotes: (state, action) => {
            state.notes = action.payload //setea las notas del usuario
        },

        setSaving: (state) => {
            state.isSaving = true; //setea el estado de guardando una nueva nota en true
            state.messageSaved = ''; //setea el mensaje de guardado en vacio
        },

        updateNote: (state, action) => {
            state.isSaving = false; //se desactiva el estado de guardado
            state.notes = state.notes.map( note => {
                if ( note.id === action.payload.id ) {
                    return action.payload;
                }
                return note;
            });

            state.messageSaved = `${ action.payload.title }, guardada correctamente`;
        },

        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ]; //agrega las fotos a la nota activa 
            state.isSaving = false; //se desactiva el estado de guardado 
        },

        clearNotesLogout: (state) => {
            state.isSaving = false; //se desactiva el estado de guardado
            state.messageSaved = ''; //limpia el mensaje de guardado
            state.notes = []; //limpia las notas
            state.active = null; //limpia la nota activa
        },

        deleteNoteById: (state, action) => {
            state.active = null; //limpia la nota activa
            state.notes = state.notes.filter( note => note.id !== action.payload ); //elimina la nota de la lista de notas
            
        }
    }

});


// Action creators are generated for each case reducer function
export const { 
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById
 } = journalSlice.actions;