import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations= {}) => {  
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {  //cuando el formulario cambia, se ejecuta el hook useEffect 
        createValidator(); 
    }, [ formState ]);

    useEffect(() => {
        setFormState(initialForm); //se reinicia el formulario para que no se quede con los valores anteriores para cambiar de nota o para editar
    }, [ initialForm ])
    


    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {
            if (formValidation[formValue] !== null ) return false; //si algun campo no es valido, el formulario no es valido
        }  

        return true ; //si todos los campos son validos, el formulario es valido
    }, [ formValidation ]);  //si el formulario cambia, se ejecuta el hook useEffect


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidator = () => {

        const formCheckedValues = {};

        for ( const formField of Object.keys( formValidations )) { //recorre todos los campos del formulario
            const [ fn, errorMessage = 'Este campo es requerido' ] = formValidations[ formField ]; //si no se especifica un mensaje de error, se asigna por defecto

            formCheckedValues[ `${ formField }Valid` ] = fn( formState[ formField ] ) ? null : errorMessage; //si la función retorna true, no hay error 
        }

        setFormValidation( formCheckedValues );  //se actualiza el estado del formulario
        
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation, //se agrega el estado de validación
        isFormValid 
    }
}