import { Routes, Route, HashRouter } from "react-router-dom";
import * as Pages from '../pages/export'

const AppRouter = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/facturacion" element={<Pages.SellingPage />} />
            </Routes>
        </HashRouter>
    )
}

export default AppRouter;