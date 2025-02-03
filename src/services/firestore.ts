import { Client } from "../types/firebase";
import { Receipt } from "../types/products";
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

export const addReceiptToFirestore = async (receipt: Receipt) => {
    try {
        console.log('Receipt being saved:', receipt);
        const receiptDoc = doc(db, 'receipts', receipt.id);
        await setDoc(receiptDoc, receipt);

        console.log('Receipt added to Firestore');
    } catch (error) {
        console.error('Error adding receipt to Firestore', error);
    }
}