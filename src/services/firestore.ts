import { Client } from "../types/firebase";
import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const addClienttoFirestore = async (client: Client) => {
    try {
        const clientDoc = doc(db, 'clients', client.id);
        await setDoc(clientDoc, client);

        console.log('Client added to Firestore');

        return true;
    } catch (error) {
        console.error('Error adding client to Firestore', error);
        return false;
    }
}