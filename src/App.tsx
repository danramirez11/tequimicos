import { useDispatch, useSelector } from "react-redux";
import AppRouter from "./routes/routes";
import { AppDispatch, StoreType } from "./store/store";
import { useEffect } from "react";
import { fetchComboData } from "./store/slices/comboSlice";
import { fetchLidData } from "./store/slices/lidSlice";
import { fetchClientData, updateClients } from "./store/slices/clientSlice";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./services/firebaseConfig";

const App = () => {
    const dispatch = useDispatch<AppDispatch>();

    const loadClient = useSelector((state: StoreType) => state.clients.loading);
    const loadLids = useSelector((state: StoreType) => state.lids.loading);
    const loadCombos = useSelector((state: StoreType) => state.combinations.loading);

    useEffect(() => {
        dispatch(fetchComboData());  
        dispatch(fetchLidData());   
        dispatch(fetchClientData());
    }, [dispatch])

    useEffect(() => {
        const collectionRef = collection(db, "clients");

        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const clients = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));

            dispatch(updateClients(clients))
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);


    if (loadClient || loadLids || loadCombos) {
        return <h1>Cargando</h1>
    }

    return (
        <AppRouter/>
    );
}

export default App;