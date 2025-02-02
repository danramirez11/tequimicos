import { useDispatch, useSelector } from "react-redux";
import AppRouter from "./routes/routes";
import { AppDispatch, StoreType } from "./store/store";
import { useEffect } from "react";
import { fetchComboData } from "./store/slices/comboSlice";
import { fetchLidData } from "./store/slices/lidSlice";
import { fetchClientData, updateClients } from "./store/slices/clientSlice";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./services/firebaseConfig";
import { addReceipt, modifyReceipt, removeReceipt } from './store/slices/receiptSlice'

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
            const clients = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));

            dispatch(updateClients(clients))
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const collectionRef = collection(db, 'receipts')

        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    console.log('New receipt: ', change.doc.data());
                    dispatch(addReceipt(change.doc.data()));
                }
                if (change.type === 'modified') {
                    console.log('Modified receipt: ', change.doc.data());
                    dispatch(modifyReceipt(change.doc.data()));
                }
                if (change.type === 'removed') {
                    console.log('Removed receipt: ', change.doc.data());
                    dispatch(removeReceipt(change.doc.data()));
                }
            });
        });

        return () => unsubscribe();
    }, [])

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

    const excelLids = [
        {
            "Tapa": "Boticaria 24"
        },
        {
            "Tapa": "Boticaria 28"
        },
        {
            "Tapa": "Lazo Colores surtidos"
        },
        {
            "Tapa": "Pistola 28 "
        },
        {
            "Tapa": "Pistola Semi Industrial 28"
        },
        {
            "Tapa": "Pistola Industrial 28"
        },
        {
            "Tapa": "Pistola Mini 24"
        },
        {
            "Tapa": "Pistola Mini 28"
        },
        {
            "Tapa": "Pitorros Eco"
        },
        {
            "Tapa": "Pitorros Laborat."
        },
        {
            "Tapa": "Subtapa 28"
        },
        {
            "Tapa": "Subtapa 36 Garrafa"
        },
        {
            "Tapa": "Tapa Gotero 12"
        },
        {
            "Tapa": "Tapa Sencilla 18"
        },
        {
            "Tapa": "Tapa Sencilla 24"
        },
        {
            "Tapa": "Tapa con liner 24"
        },
        {
            "Tapa": "Tapa 26 corta (pet 150)"
        },
        {
            "Tapa": "Tapa Seg. 28"
        },
        {
            "Tapa": "Tapa Corta Seg. 28"
        },
        {
            "Tapa": "Tapa Seg. Garrafa 38"
        },
        {
            "Tapa": "Tapa Sencilla 38"
        },
        {
            "Tapa": "Tapa Yogurt 38"
        },
        {
            "Tapa": "Tapa 52"
        },
        {
            "Tapa": "Tapa 65"
        },
        {
            "Tapa": "Tapa 70"
        },
        {
            "Tapa": "Tapa 82"
        },
        {
            "Tapa": "Tapa 83"
        },
        {
            "Tapa": "Tapa 84"
        },
        {
            "Tapa": "Cremera 24"
        },
        {
            "Tapa": "Cremera 28"
        },
        {
            "Tapa": "Cremera Lujo 28"
        },
        {
            "Tapa": "Tapa Distop 24"
        },
        {
            "Tapa": "Tapa Distop Larga 24/415"
        },
        {
            "Tapa": "Tapa Distop 28"
        },
        {
            "Tapa": "Tapa Fliptop 18"
        },
        {
            "Tapa": "Tapa Distop Lujo 24"
        },
        {
            "Tapa": "Tapa Fliptop 24"
        },
        {
            "Tapa": "Tapa Fliptop 28"
        },
        {
            "Tapa": "Tapa Metalizada 18"
        },
        {
            "Tapa": "Tapa Metalizada 24"
        },
        {
            "Tapa": "Tapa Metalizada 28"
        },
        {
            "Tapa": "Tapa Push Pull 24"
        },
        {
            "Tapa": "Tapa Push Pull 28"
        },
        {
            "Tapa": "Spray 18"
        },
        {
            "Tapa": "Spray 24"
        },
        {
            "Tapa": "Spray larga 24/415"
        },
        {
            "Tapa": "Spray Lujo 24"
        },
        {
            "Tapa": "Spray 28"
        },
        {
            "Tapa": "Tapa Vinilo 120ml"
        },
        {
            "Tapa": "Tapa Vinilo 33g"
        },
        {
            "Tapa": "Tapa vinilo 60g"
        },
        {
            "Tapa": "Tapa Twist 28"
        },
        {
            "Tapa": "Tapa Pico 28"
        },
        {
            "Tapa": "Tapa Fliptop Cosmetica 24"
        },
        {
            "Tapa": "Tapa Galon Pet"
        },
        {
            "Tapa": "Tapa Fliptop Cosmetica 28"
        }
    ]

    console.log('Tapas que no tienen el número de paca:')

    lids.forEach(lid => {
        if (lid.colors && Object.prototype.hasOwnProperty.call(lid.colors, 'none')) {
            //console.log(`${lid.name} no tiene colores`, lid.id)
        } 

        if (lid.pack === 0){
            console.log(`${lid.name}`)
        }
    })

    
    console.log('-------------------------')

    console.log('Tapas que no tienen precios individuales:')

    lids.forEach(lid => {
        const lidFound = excelLids.find(lidExcel => lidExcel.Tapa.trim() === lid.name);

        if (!lidFound) {
            console.log(`${lid.name}`);
        }
    })

    

    colors.forEach((color) => {
        const colorSinEspacios = color.TAPA.trim();
        const lidFound = lids.find(lid => lid.name === colorSinEspacios);

        if (!lidFound) {
            //console.log(`No se encontró ${colorSinEspacios}`);
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