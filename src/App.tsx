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

    const lids = useSelector((state: StoreType) => state.lids.lids);

    useEffect(() => {
        dispatch(fetchComboData());  
        dispatch(fetchLidData());   
        dispatch(fetchClientData());
    }, [dispatch])

    useEffect(() => {
        const collectionRef = collection(db, "clients");

        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            console.log('Client data updated');
            const clients = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));

            dispatch(updateClients(clients))
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    const colors = [
        {
            "TAPA": "Boticaria 24"
        },
        {
            "TAPA": "Boticaria 28"
        },
        {
            "TAPA": "Lazo Colores surtidos"
        },
        {
            "TAPA": "Pistola 28 "
        },
        {
            "TAPA": "Pistola Semi Industrial 28"
        },
        {
            "TAPA": "Pistola Industrial 28"
        },
        {
            "TAPA": "Pistola Mini 24"
        },
        {
            "TAPA": "Pistola Mini 28"
        },
        {
            "TAPA": "Pitorro"
        },
        {
            "TAPA": "Subtapa 28"
        },
        {
            "TAPA": "Subtapa 36 Garrafa"
        },
        {
            "TAPA": "Tapa Gotero 12"
        },
        {
            "TAPA": "Tapa Sencilla 18"
        },
        {
            "TAPA": "Tapa Sencilla 24"
        },
        {
            "TAPA": "Tapa con liner 24"
        },
        {
            "TAPA": "Tapa 26 corta (pet 150)"
        },
        {
            "TAPA": "Tapa Seg. 28"
        },
        {
            "TAPA": "Tapa Corta Seg. 28"
        },
        {
            "TAPA": "Tapa Seg. Garrafa 38"
        },
        {
            "TAPA": "Tapa Sencilla 38"
        },
        {
            "TAPA": "Tapa Yogurt 38"
        },
        {
            "TAPA": "Tapa 52"
        },
        {
            "TAPA": "Tapa 65"
        },
        {
            "TAPA": "Tapa 70"
        },
        {
            "TAPA": "Tapa 82"
        },
        {
            "TAPA": "Tapa 83"
        },
        {
            "TAPA": "Tapa 84"
        },
        {
            "TAPA": "Cremera 24"
        },
        {
            "TAPA": "Cremera 28"
        },
        {
            "TAPA": "Cremera Lujo 24"
        },
        {
            "TAPA": "Cremera Lujo 28"
        },
        {
            "TAPA": "Tapa Distop 24"
        },
        {
            "TAPA": "Tapa Distop Larga 24/415"
        },
        {
            "TAPA": "Tapa Distop 28"
        },
        {
            "TAPA": "Tapa Fliptop 18"
        },
        {
            "TAPA": "Tapa Distop Lujo 24"
        },
        {
            "TAPA": "Tapa Fliptop 24"
        },
        {
            "TAPA": "Tapa Fliptop 28"
        },
        {
            "TAPA": "Tapa Metalizada 18"
        },
        {
            "TAPA": "Tapa Metalizada 24"
        },
        {
            "TAPA": "Tapa Metalizada 28"
        },
        {
            "TAPA": "Tapa Push Pull 24"
        },
        {
            "TAPA": "Tapa Push Pull 28"
        },
        {
            "TAPA": "Spray 18"
        },
        {
            "TAPA": "Spray 24"
        },
        {
            "TAPA": "Spray larga 24/415"
        },
        {
            "TAPA": "Spray Lujo 24"
        },
        {
            "TAPA": "Spray 28"
        },
        {
            "TAPA": "Tapa Aluminio 89"
        },
        {
            "TAPA": "Tapa Vinilo 120ml"
        },
        {
            "TAPA": "Tapa Vinilo 33g"
        },
        {
            "TAPA": "Tapa vinilo 60g"
        },
        {
            "TAPA": "Tapa Twist 28"
        },
        {
            "TAPA": "Tapa Pico 28"
        },
        {
            "TAPA": "Tapa Fliptop Cosmetica 24"
        },
        {
            "TAPA": "Tapa Galon Pet"
        },
        {
            "TAPA": "Tapa Fliptop Cosmetica 28"
        },
        {
            "TAPA": "Tapa Fliptop 90mm"
        }
    ]

    lids.forEach(lid => {
        if (lid.colors && Object.prototype.hasOwnProperty.call(lid.colors, 'none')) {
            console.log(`${lid.name} no tiene colores`, lid.id)
        } else {
            return
        }
    })

    colors.forEach((color) => {
        const colorSinEspacios = color.TAPA.trim();
        const lidFound = lids.find(lid => lid.name === colorSinEspacios);

        if (!lidFound) {
            console.log(`No se encontró ${colorSinEspacios}`);
        }
    })

    console.log('-------------------------')

    if (loadClient || loadLids || loadCombos) {
        return <h1>Cargando</h1>
    }

    return (
        <AppRouter/>
    );
}

export default App;