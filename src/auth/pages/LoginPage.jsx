import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';

const formData = {
    email: '',  
    password: ''
}


export const LoginPage = () => { 

  const { status, errorMessage } = useSelector(state => state.auth);  
  
  const dispatch = useDispatch();

  const { email, password, onInputChange, formState } = useForm(formData);  

  const isAuthenticating = useMemo( () => status === 'checking', [status] );  // usamos el useMmemo para que se desactibe el boton de login cuando se esta autenticando el usuario

  const onSubmit = (e) => {
    e.preventDefault();  //previene que el formulario se envie
    //console.log({ email, password }); 
    dispatch( startLoginWithEmailPassword({ email, password }) ); 
  }

  const onGoogleSignIn = () => {
    console.log('Google sign in');
    dispatch( startGoogleSignIn() );
  }


  return (

    <AuthLayout title="Login">
          <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster"> 
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField 
                  label="Correo" 
                  type="email"  
                  autoComplete='current-email'
                  placeholder="Correo"   
                  fullWidth  
                  name='email' // el nombre del input es el mismo que el nombre del objeto que se le pasa al hook useForm 
                  value={email}
                  onChange={onInputChange} // el onChange es el que se ejecuta cuando se cambia el valor del input
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField 
                  label="Contraseña" 
                  type="password"  
                  autoComplete='current-password'
                  placeholder="Contraseña" 
                  fullWidth
                  name='password' // el nombre del input es el mismo que el nombre del objeto que se le pasa al hook useForm
                  value={password} 
                  onChange={onInputChange} 
                />
              </Grid>

              <Grid container display={ !!errorMessage ? '': 'none' } sx={{ mt:1 }}>
                <Grid item xs={12} >
                  <Alert severity="error"> { errorMessage } </Alert>
                </Grid>

              </Grid>

              <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Button  
                    disabled={ isAuthenticating } // si esta autenticando o no esta valido el formulario
                    type='submit' 
                    variant="contained" 
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    disabled={ isAuthenticating } // si esta autenticando o no esta valido el formulario
                    variant="contained" 
                    fullWidth onClick={ onGoogleSignIn }
                  >
                    <Google />
                     <Typography sx={{ml:1}}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end' >
                <Link component={ RouterLink } color='inherit' to="/auth/register">
                  Crear una cuenta
                </Link>
              </Grid>

            </Grid>
          </form>
    </AuthLayout>
    
  )
}
