import { Routes, Route, HashRouter } from "react-router-dom";
import * as Pages from '../pages/export'
import SideBar from "../components/SideBar/SideBar";
import { Suspense } from "react";

const AppRouter = () => {
    return (
        <HashRouter>
            
            <SideBar/>
            
            <Routes>
                <Route path="/facturacion" element={<Pages.SellingPage />} />
                <Route 
                    path="/historial" 
                    element={
                        <Suspense fallback={<div>Cargando...</div>}>
                            <Pages.HistoryPage />
                        </Suspense>
                    } 
                />
            </Routes>
        </HashRouter>
    )
}

export default AppRouter;