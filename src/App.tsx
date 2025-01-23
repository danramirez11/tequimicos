import { useDispatch } from "react-redux";
import AppRouter from "./routes/routes";
import { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { fetchComboData } from "./store/slices/comboSlice";
import { fetchLidData } from "./store/slices/lidSlice";
import { fetchClientData } from "./store/slices/clientSlice";

const App = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchComboData());  
        dispatch(fetchLidData());   
        dispatch(fetchClientData());
    }, [dispatch])

    return (
        <AppRouter/>
    );
}

export default App;