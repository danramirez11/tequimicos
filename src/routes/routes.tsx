import { Routes, Route, HashRouter } from "react-router-dom";
import * as Pages from '../pages/export'
import SideBar from "../components/SideBar/SideBar";

const AppRouter = () => {
    return (
        <HashRouter>
            
            <SideBar/>
            
            <Routes>
                <Route path="/facturacion" element={<Pages.SellingPage />} />
            </Routes>
        </HashRouter>
    )
}

export default AppRouter;