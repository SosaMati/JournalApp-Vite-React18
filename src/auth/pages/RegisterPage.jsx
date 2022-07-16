import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { starCreatingUserWithEmailPassword } from '../../store/auth';


const formData = {
  email: '',
  password: '',
  displayName: '',
};

const formValidations = {  //validaciones de los campos del formulario 
  email: [ (value) => value.includes('@'), 'El email es requerido'],
  password: [ (value) => value.length >= 6, 'El password debe tener al menos 6 caracteres'],
  displayName: [ (value) => value.length >= 1, 'El nombre es requerido'], 
} 


export const RegisterPage = () => {

  const dispatch = useDispatch(); //dispatch para ejecutar las acciones

  const [formSubmitted, setFormSubmitted] = useState(false); 

  
  const { status, errorMessage } = useSelector( state => state.auth ); //status y errorMessage de la accion de registro
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]); //memo para que solo se ejecute una vez al iniciar la pagina

  const { 
    formState, displayName, email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid, 
  } = useForm( formData, formValidations ); // desestructuracion de los valores de los inputs 

  

  const onSubmit = ( e ) => {
    e.preventDefault(); 
    setFormSubmitted(true);  

    if ( !isFormValid ) return;

    dispatch( starCreatingUserWithEmailPassword(formState) ); //ejecuta la accion de crear usuario con email y password  
  }


  return (

    <AuthLayout title="Crear cuenta">

          <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
            <Grid container>

            <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField 
                  label="Nombre completo" 
                  type="text"  
                  autoComplete='current-name'
                  placeholder="Nombre completo" 
                  fullWidth
                  name='displayName'
                  value={ displayName }  
                  onChange={ onInputChange }  
                  error={ !!displayNameValid && formSubmitted }  // si no es valido, muestra el error
                  helperText= { displayNameValid } 
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField 
                  label="Correo" 
                  type="email"  
                  autoComplete='current-email'
                  placeholder="Correo" 
                  fullWidth
                  name='email'
                  value={ email }  
                  onChange={ onInputChange }
                  error={ !!emailValid && formSubmitted }  // si no es valido, muestra el error
                  helperText= { emailValid }
                  
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField 
                  label="Contraseña" 
                  type="password"  
                  autoComplete='current-password'
                  placeholder="Contraseña" 
                  fullWidth
                  name='password'
                  value={ password }  
                  onChange={ onInputChange }
                  error={ !!passwordValid && formSubmitted }  // si no es valido, muestra el error
                  helperText= { passwordValid }
                />
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

              <Grid item xs={12} display={ !!errorMessage ? '': 'none' }>
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>

                <Grid item xs={12}>
                  <Button 
                    disabled={ isCheckingAuthentication }
                    type="submit" 
                    variant="contained" 
                    fullWidth>
                    Crear cuenta
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end' >
                <Typography sx={{mr: 1}}>¿Ya tienes una cuenta?</Typography>
                <Link component={ RouterLink } color='inherit' to="/auth/login">
                  Ingresar
                </Link>
              </Grid>

            </Grid>
          </form>
    </AuthLayout>
    
  )
}
