import { useDispatch } from "react-redux";
import AppRouter from "./routes/routes";
import { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { fetchComboData } from "./store/slices/comboSlice";

const App = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchComboData());        
    }, [dispatch])

    return (
        <AppRouter/>
    );
}

export default App;