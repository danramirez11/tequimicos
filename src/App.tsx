import { useDispatch, useSelector } from "react-redux";
import AppRouter from "./routes/routes";
import { AppDispatch, StoreType } from "./store/store";
import { useEffect } from "react";
import { fetchComboData } from "./store/slices/comboSlice";
import { fetchLidData } from "./store/slices/lidSlice";
import { fetchClientData } from "./store/slices/clientSlice";

const App = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { loading } = useSelector((state: StoreType) => state.clients);

    useEffect(() => {
        dispatch(fetchComboData());  
        dispatch(fetchLidData());   
        dispatch(fetchClientData());
    }, [dispatch])

    if (loading) {
        return <h1>Cargando</h1>
    }

    return (
        <AppRouter/>
    );
}

export default App;