import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";

import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";



export const AppRouter = () => {

  const { status } = useCheckAuth(); //custom hook con la funcion de checar si esta autenticado

  if (status === 'checking') {
    return <CheckingAuth />; // si el estado es checking, se muestra el componente CheckingAuth
  }

  return (
    <Routes>

        {
          (status === 'authenticated') // si el estado es authenticated, se muestran las rutas de autenticacion
          ? <Route path="/*" element={ <JournalRoutes/> } /> 
          : <Route path="/auth/*" element={ <AuthRoutes/> } /> 
        }
        <Route path="/*" element={ <Navigate to= '/auth/login' /> } /> 
        <Route />
    </Routes>
  )
}


