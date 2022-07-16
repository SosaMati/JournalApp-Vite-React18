import { useSelector, useDispatch } from "react-redux";
import { useMemo, useEffect, useRef } from "react";


import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from "../../hooks";
import { ImageGallery } from "../components";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );   

    const { body, title, date, onInputChange, formState } = useForm( note );    

    const dateString = useMemo(() => { 
        const newDate = new Date( date ); // creamos una nueva fecha
        return newDate.toUTCString(); // la convertimos a string
    }, [date]); // y la pasamos como dependencia

    const fileInputRef = useRef(); // creamos un ref para el input de archivos


    useEffect(() => {
      dispatch( setActiveNote(formState) );
    }, [formState]);


    useEffect(() => {
        if ( messageSaved.length > 0 ) {
            Swal.fire('Nota guardada', messageSaved, 'success'); // mostramos un mensaje de que la nota se guardó
        }
    }, [ messageSaved ]);
    

    const onSaveNote = () => {  // guardamos la nota 
        dispatch( startSaveNote() ); 
    }

    const onFileInputChange = ({ target }) => {
        if ( target.files === 0 ) return;
        dispatch( startUploadingFiles( target.files ) ); 
    }

    const onDelete = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarla!'
        }).then((result) => {
            if (result.value) {
                 dispatch( startDeletingNote());
            }
        });
    }
    

    return (
        <Grid 
            container 
            direction="row" 
            justifyContent='space-between' 
            alignItems='center' 
            x={{ mb:1 }} 
            className="animate__animated animate__fadeIn animate__faster"
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight="light">{ dateString }</Typography>
            </Grid>
            
            <Grid item>

                <input
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />

                <IconButton 
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }  
                >
                    <UploadOutlined/>
                </IconButton>

                <Button 
                    disabled={ isSaving }
                    onClick={ onSaveNote }
                    color="primary" 
                    sx={{ padding:2 }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1}} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type='text'
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField
                    type='text'
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el dia de hoy?"
                    minRows={ 5 }
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>

            <Grid container justifyContent='end' >
                <Button
                onClick = { onDelete }
                sx={{ mt: 2 }}
                color= "error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

         <ImageGallery images= { note.imageUrls } /> 

    </Grid>
  )
}
