import { useState } from "react";
import { Receipt, ReceiptChemical, ReceiptContainer, ReceiptLid } from "../types/products";

const useForm = () => {
    const emptyReceipt: Receipt = {
        client: '',
        date: '',
        hour: '',
        products: [],
        total: 0,
        personal: '',
        payment: '',
        isDelivery: false,
        isFinished: false
    }

    const [receipt , setReceipt] = useState<Receipt>({...emptyReceipt})

    const handleProductChange = (product: ReceiptContainer | ReceiptLid | ReceiptChemical) => {
        setReceipt((p: Receipt) => {
            const products = p.products.map(p => {
                if (p.id === product.id) {
                    return product
                }
                return p
            })
            return {...p, products}
        })
    }

    const handleMiscChange = (key: string, value: string) => {
        setReceipt((p: Receipt) => ({...p, [key]: value}))
    }

    const handleAddContainer = () => {
        const newContainer: ReceiptContainer = {
            productId: '',
            id: crypto.randomUUID(),
            type: 'container',
            name: '',
            price: 0,
            quantity: 0,
            lids: []
        }
        setReceipt((p: Receipt) => ({...p, products: [...p.products, newContainer]}))
    }

    const handleAddLid = () => {
        const newLid: ReceiptLid = {
            productId: '',
            type: 'lid',
            id: crypto.randomUUID(),
            name: '',
            price: 0,
            quantity: 0,
            colors: []
        }
        setReceipt((p: Receipt) => ({...p, products: [...p.products, newLid]}))
    }

    const handleAddChemical = () => {
        const newChemical: ReceiptChemical = {
            productId: '',
            type: 'chemical',
            id: crypto.randomUUID(),
            name: '',
            price: 0,
            quantity: 0,
            unit: ''
        }
        setReceipt((p: Receipt) => ({...p, products: [...p.products, newChemical]}))
    }

    const handleIsDelivery = () => {
        setReceipt((p: Receipt) => ({...p, isDelivery: !p.isDelivery}))
    }

    const handleFinish = () => {
        setReceipt((p: Receipt) => ({...p, isFinished: true, date: new Date().toISOString(), hour: new Date().toLocaleTimeString()}))
    }

    return { receipt, handleProductChange, handleMiscChange, handleAddContainer, handleAddLid, handleAddChemical, handleIsDelivery, handleFinish }
}

export default useForm;