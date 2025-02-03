import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import * as Pages from '../pages/export'
import SideBar from "../components/SideBar/SideBar";
import { Suspense, useState } from "react";
import ProtectedRoutes from "./protectedRoutes";

const AppRouter = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const onLogIn = (input: string) => {
        console.log(import.meta.env.VITE_ROUTES_PASSWORD)
        if (input === import.meta.env.VITE_ROUTES_PASSWORD) {
            setIsLoggedIn(true);
        } else {
            alert('Contraseña incorrecta');
        }
    }

    return (
        <HashRouter>
            
            <SideBar/>
            
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to='/facturacion'/> : <Pages.LandingPage onLogIn={onLogIn}/>} />

                <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn}/>}>
                <Route path="/facturacion" element={<Pages.SellingPage />} />
                <Route 
                    path="/historial" 
                    element={
                        <Suspense fallback={<div>Cargando...</div>}>
                            <Pages.HistoryPage />
                        </Suspense>
                    } 
                />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default AppRouter;