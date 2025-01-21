/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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

    const emptyContainer: ReceiptContainer = {
        priceBy: 'unit',
        productId: '',
        id: '',
        type: 'container',
        name: 'none',
        price: 0,
        quantity: 0,
        lids: [
            {
                priceBy: 'unit',
                productId: '',
                type: 'lid',
                id: '',
                name: 'none',
                price: 0,
                quantity: 0,
                colors: [ { name: 'rojo', quantity: 0 } ]
            }
        ]
    }

    const emptyLid: ReceiptLid = {
        priceBy: 'unit',
        productId: '',
        type: 'lid',
        id: '',
        name: 'none',
        price: 0,
        quantity: 0,
        colors: []
    }

    const emptyChemical: ReceiptChemical = {
        productId: '',
        type: 'chemical',
        id: '',
        name: '',
        price: 0,
        quantity: 0,
        unit: ''
    }

    const [receipt , setReceipt] = useState<Receipt>({...emptyReceipt})
    const [chosenProducts, setChosenProducts] = useState<any>([])

    const pack = Math.floor(Math.random() * (120 - 65 + 1)) + 65;
      


    const calculateTotal = () => {
        console.log('hey');
    
        const updatedReceipt = { ...receipt };
    
        updatedReceipt.products = receipt.products.map((p) => {
            const productData = chosenProducts.find((cp: any) => cp.id === p.productId);
    
            if (!productData) return p;
    
            let updatedLids: ReceiptLid[] = [];
    
            if (p.type === 'container') {
                updatedLids = p.lids
                    .map((l) => {
                        const lidData = productData.lids.find((pl: any) => pl.id === l.productId);
                        if (!lidData) return undefined;
    
                        if (lidData && lidData.prices[l.priceBy]) {
                            return { ...l, price: lidData.prices[l.priceBy] * l.quantity };
                        }
    
                        return l;
                    })
                    // Use your type guard to filter undefined values
                    .filter((l): l is ReceiptLid => l !== undefined);
    
                return { ...p, lids: updatedLids };
            }
    
            return p;
        });
    
        setReceipt(updatedReceipt); // Update the state
    };
    

    useEffect(() => {
    //calculateTotal();
    console.log('render')
    }, [receipt.products]);

    console.log(receipt)

    //BASIC FORM HANDLERS

    const handleMiscChange = (key: string, value: string) => {
        setReceipt((p: Receipt) => ({...p, [key]: value}))
    }

    const handleAddProduct = (product: string) => {
        if (product === 'container') {
            setReceipt((p: Receipt) => ({...p, products: [...p.products, {...emptyContainer, id: crypto.randomUUID()}]}))
        } else if (product === 'lid') {
            setReceipt((p: Receipt) => ({...p, products: [...p.products, {...emptyLid, id: crypto.randomUUID()}]}))
        } else {
            setReceipt((p: Receipt) => ({...p, products: [...p.products, {...emptyChemical, id: crypto.randomUUID()}]}))
        }
    }

    const handleIsDelivery = () => {
        setReceipt((p: Receipt) => ({...p, isDelivery: !p.isDelivery}))
    }

    const handleFinish = () => {
        setReceipt((p: Receipt) => ({...p, isFinished: true, date: new Date().toISOString(), hour: new Date().toLocaleTimeString()}))
    }


    const containerFun = {
        changeContainer: (containerId: string, container: any) => {
            const chosenContainer = JSON.parse(container)
            setChosenProducts((p: any) => ([...p, chosenContainer]))
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === containerId && product.type === 'container') {
                        return {...product, name: chosenContainer.name, productId: chosenContainer.id}
                    } else {
                        return product
                    }
                })
            }))
        },

        changeContainerQuantity: (containerId: string, quantity: number) => {
            if ( quantity > pack ){
                setReceipt((p: Receipt) => {
                    return ({...p, products: p.products.map((product) => {
                        if (product.id === containerId && product.type === 'container') {
                            return {...product, priceBy: 'pack'}
                        } else {
                            return product
                        }
                    })})
                })
            } else {
                setReceipt((p: Receipt) => {
                    return ({...p, products: p.products.map((product) => {
                        if (product.id === containerId && product.type === 'container') {
                            return {...product, priceBy: 'none', 
                                lids: product.lids.map((lid) => {
                                    return {...lid, priceBy: 'unit'}
                                })
                            }
                        } else {
                            return product
                        }
                    })}) 
                })
            }
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === containerId && product.type === 'container') {
                        return {...product, quantity}
                    } else {
                        return product
                    }
                })
            }))
        },

        changeLid: (containerId: string, lidId: string, lid: any) => {
            const chosenLid = JSON.parse(lid)
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === containerId && product.type === 'container') {
                        return {
                            ...product,
                            lids: product.lids.map((lid) => {
                                if (lid.id === lidId) {
                                    return {...lid, name: chosenLid.name, productId: chosenLid.id}
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
        },

        changeLidQuantity: (containerId: string, lidId: string, quantity: number) => {
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === containerId && product.type === 'container') {
                        return {
                            ...product,
                            lids: product.lids.map((lid) => {
                                if (lid.id === lidId) {
                                    return {...lid, quantity, priceBy: quantity >= 12 ? 'dozen' : 'unit'}
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
        },

        changeLidColor: (containerId: string, lidId: string, color: string, key: string, value: string | number) => {
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
        },

        addLid: (containerId: string) => {
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === containerId && product.type === 'container') {
                        return {
                            ...product,
                            lids: [...product.lids, {...emptyLid, id: crypto.randomUUID()}]
                        }
                    } else {
                        return product
                    }
                })
            }))
        },

        addLidColor: (containerId: string, lidId: string) => {
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
        },

        deleteLid: (containerId: string, lidId: string) => {
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === containerId && product.type === 'container') {
                        return {
                            ...product,
                            lids: product.lids.filter((lid) => lid.id !== lidId)
                        }
                    } else {
                        return product
                    }
                })
            }))
        },

        deleteLidColor: (containerId: string, lidId: string, color: string) => {
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
                                        colors: lid.colors.filter((c) => c.name !== color)
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
    }


    //LID HANDLERS

    const lidFun = {
        changeLid: (lidId: string, lid: any) => {
            const chosenLid = JSON.parse(lid)
            setChosenProducts((p: any) => ([...p, chosenLid]))
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === lidId && product.type === 'lid') {
                        return {...product, name: chosenLid.name, productId: chosenLid.id}
                    } else {
                        return product
                    }
                })
            }))
        },

        changeLidQuantity: (lidId: string, quantity: number) => {
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === lidId && product.type === 'lid') {
                        return {...product, quantity}
                    } else {
                        return product
                    }
                })
            }))
        },

        changeLidColor: (lidId: string, color: string, key: string, value: string | number) => {
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === lidId && product.type === 'lid') {
                        return {
                            ...product,
                            colors: product.colors.map((c) => {
                                if (c.name === color) {
                                    return {...c, [key]: value}
                                } else {
                                    return c
                                }
                            })
                        }
                    } else {
                        return product
                    }
                })
            }))
        }
    }

    //CHEMICAL HANDLERS

    return { receipt, containerFun, lidFun, handleMiscChange, handleIsDelivery, handleFinish, handleAddProduct,  }
}

export default useForm;