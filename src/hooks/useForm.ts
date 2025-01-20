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

    console.log(receipt)


    const handleProductChange = (id:string, key: string, value: string) => {
        setReceipt((p: Receipt) => ({
            ...p, 
            products: p.products.map((product) => {
                if (product.id === id) {
                    return {...product, [key]: value}
                } else {
                    return product
                }
            })
        }))
    }

    const handleContainerLidChange = (containerId: string, lidId: string, key: string, value: string) => {
        setReceipt((p: Receipt) => ({
            ...p,
            products: p.products.map((product) => {
                if (product.id === containerId && product.type === 'container') {
                    return {
                        ...product,
                        lids: product.lids.map((lid) => {
                            if (lid.id === lidId) {
                                return {...lid, [key]: value}
                            } else {
                                return lid
                            }
                        })
                    }
                } else {
                    return product
                }
            })
        }))
    }

    const handleConLidColorChange = (containerId: string, lidId: string, color: string, key: string, value: string) => {
        setReceipt((p: Receipt) => ({
            ...p,
            products: p.products.map((product) => {
                if (product.id === containerId && product.type === 'container') {
                    return {
                        ...product,
                        lids: product.lids.map((lid) => {
                            if (lid.id === lidId) {
                                return {
                                    ...lid,
                                    colors: lid.colors.map((c) => {
                                        if (c.name === color) {
                                            return {...c, [key]: value}
                                        } else {
                                            return c
                                        }
                                    })
                                }
                            } else {
                                return lid
                            }
                        })
                    }
                } else {
                    return product
                }
            })
        }))
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
            lids: [
                {
                    productId: '',
                    type: 'lid',
                    id: crypto.randomUUID(),
                    name: '',
                    price: 0,
                    quantity: 0,
                    colors: [
                        {
                            name: 'rojo',
                            quantity: 0
                        }
                    ]
                }
            ]
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

    const addLidToContainer = (containerId: string) => {
        setReceipt((p: Receipt) => ({
            ...p,
            products: p.products.map((product) => {
                if (product.id === containerId && product.type === 'container') {
                    return {
                        ...product,
                        lids: [...product.lids, {
                            productId: '',
                            type: 'lid',
                            id: crypto.randomUUID(),
                            name: '',
                            price: 0,
                            quantity: 0,
                            colors: [ { name: 'rojo', quantity: 0 } ]
                        }]
                    }
                } else {
                    return product
                }
            })
        }))
    }

    const addColorToLid = (containerId: string, lidId: string) => {
        setReceipt((p: Receipt) => ({
            ...p,
            products: p.products.map((product) => {
                if (product.id === containerId && product.type === 'container') {
                    return {
                        ...product,
                        lids: product.lids.map((lid) => {
                            if (lid.id === lidId) {
                                return {
                                    ...lid,
                                    colors: [...lid.colors, { name: 'rojo', quantity: 0 }]
                                }
                            } else {
                                return lid
                            }
                        })
                    }
                } else {
                    return product
                }
            })
        }))
    }

    return { receipt, handleProductChange, handleMiscChange, handleAddContainer, handleAddLid, handleAddChemical, handleIsDelivery, handleFinish, handleContainerLidChange, handleConLidColorChange, addLidToContainer, addColorToLid }
}

export default useForm;