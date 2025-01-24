/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { PriceBy, Receipt, ReceiptChemical, ReceiptContainer, ReceiptLid, Spout } from "../types/products";
import { CombinationLid } from "../types/firebase";
import { useEffect } from "react";

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
        lids: [],
        pack: 0
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
    const [ finishErrors, setFinishErrors ] = useState<string[]>([])

    console.log(receipt)

    useEffect(() => {
        const handleReceiptChange = () => {
            const total = receipt.products.reduce((acc, product) => acc + product.price, 0);
            setReceipt((p: Receipt) => ({...p, total}))
        };

        console.log('hola')

        handleReceiptChange();
    }, [receipt.products]);

    useEffect(() => {
        if (finishErrors.length === 0) {
            setReceipt((p: Receipt) => ({...p, isFinished: true, date: new Date().toLocaleDateString(), hour: new Date().toLocaleTimeString()}))
        }
    }, [finishErrors])

    //BASIC FORM HANDLERS

    const handleMiscChange = (key: string, value: string) => {
        setReceipt((p: Receipt) => ({...p, [key]: value}))
    }

    const handleAddProduct = (product: string) => {
        if (product === 'container') {
            setReceipt((p: Receipt) => ({...p, products: [...p.products, {...emptyContainer, id: crypto.randomUUID(), lids: [{...emptyLid, id: crypto.randomUUID()}]}]}))
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
        setReceipt((prev) => {
            
            const errors: string[] = [];


            prev.products.forEach((product) => {
                if (product.type === 'container') {
                    if (product.name === 'none') {
                        errors.push('Falta seleccionar envase');
                    }

                    if (product.quantity !== product.lids.reduce((acc, lid) => acc + lid.quantity, 0)) {
                        errors.push(`La cantidad de envases y tapas no coincide en ${product.name}`);
                    }

                    product.lids.forEach((lid) => {
                        if (lid.name === 'none') {
                            errors.push(`Falta seleccionar tapa en ${product.name}`);
                        }

                        if (lid.colors.length === 0) {
                            errors.push(`Falta seleccionar colores en ${product.name} - ${lid.name}`);
                        }

                        if (lid.quantity !== lid.colors.reduce((acc, color) => acc + color.quantity, 0)) {
                            errors.push(`La cantidad de tapas y colores no coincide en ${product.name} - ${lid.name}`);
                        }
                    })
                }
            })

            if (prev.client === '') {
                errors.push('Falta seleccionar cliente');
            }

            if (prev.personal === '') {
                errors.push('Falta seleccionar personal');
            }

            if (prev.payment === '') {
                errors.push('Falta seleccionar método de pago');
            }

            if (errors.length > 0) {
                setFinishErrors(errors);
            } else {
                setFinishErrors([]);
            }

            return prev;
        })
    }

    const checkAvailableLids = (containerId: string) => {
        const container = receipt.products.find((p) => p.id === containerId && p.type === 'container') as ReceiptContainer;
        const chosenContainer = chosenProducts.find((p: any) => p.id === container.productId);

        if (container && chosenContainer) {
            setReceipt((p: Receipt) => (
                {
                    ...p,
                    products: p.products.map((product) => {
                        if (product.id === containerId && product.type === 'container') {
                            return {
                                ...product,
                                lids: product.lids.map((lid) => {
                                    const chosenLid = chosenContainer.lids.find((l: CombinationLid) => l.id === lid.productId);
                                    if (chosenLid) {
                                        return lid
                                    } else {
                                        return {...lid, name: 'none'}
                                    }
                                })
                            }
                        } else {
                            return product
                        }
                    })
                }
            ))

    }}

    const updatePriceByContainer = (containerId: string) => {
        setReceipt((prevReceipt) => {
            const updatedReceipt = {
                ...prevReceipt.products.find((p) => p.id === containerId && p.type === 'container') as ReceiptContainer
            };
    
            const { quantity, lids } = updatedReceipt;
            const isPackGreater = updatedReceipt.pack >= 100;
    
            if (quantity < 12) {
                updatedReceipt.priceBy = 'unit';
                lids.forEach((l) => l.priceBy = 'unit');
            } else if (quantity >= updatedReceipt.pack) {
                updatedReceipt.priceBy = isPackGreater ? 'pack' : quantity >= 100 ? 'hundred' : 'pack';
                lids.forEach((l) => l.priceBy = isPackGreater ? 'pack' : quantity >= 100 ? 'hundred' : 'pack');
            } else if ( quantity >= 100 ) {
                updatedReceipt.priceBy = 'hundred';
                lids.forEach((l) => l.priceBy = 'hundred');
            } else {
                updatedReceipt.priceBy = 'dozen';
    
    
                lids.forEach((lid) => {
                    if (lid.quantity >= 12) {
                        lid.priceBy = 'dozen';
                    } else {
                        lid.priceBy = 'unit';
                    }
                });
            }
    
            return {
                ...prevReceipt,
                products: prevReceipt.products.map((product) => {
                    if (product.id === containerId && product.type === 'container') {
                        return {
                            ...product,
                            priceBy: updatedReceipt.priceBy,
                            lids: product.lids.map((l) => ({ ...l, priceBy: l.priceBy }))
                        };
                    } else {
                        return product;
                    }
                })
            };
        });

        console.log(chosenProducts)

        updatePricesContainer(containerId);
    };

    const updatePricesContainer = (containerId: string) => {

        setChosenProducts((p: any) => {
            const productId = receipt.products.find((p) => p.id === containerId && p.type === 'container')?.productId;

            console.log(productId)

            const chosenProduct = p.find((p: any) => p.id === productId);

            console.log(chosenProduct)
            console.log(p)

            setReceipt((prev) => {
                const updatedReceipt = {
                    ...prev.products.find((p) => p.id === containerId && p.type === 'container') as ReceiptContainer
                }
    
                console.log(chosenProducts)
    
                const { lids } = updatedReceipt;
    
                lids.forEach((l) => {
                    const chosenLid = chosenProduct?.lids.find((cl: CombinationLid) => cl.id === l.productId);

                    console.log(chosenLid)
    
                    if (chosenLid) {
                        l.price = chosenLid.prices[l.priceBy] * l.quantity;
                    }
                })
    
                updatedReceipt.price = lids.reduce((total, lid) => total + lid.price, 0);

                console.log(updatedReceipt.price)
    
                return {
                    ...prev,
                    products: prev.products.map((product) => {
                        if (product.id === containerId && product.type === 'container') {
                            return updatedReceipt;
                        } else {
                            return product;
                        }
                    })
                }
            })

            return p;
        })
    }
    


    //CONTAINER HANDLERS


    const containerFun = {
        changeContainer: (containerId: string, container: string) => {
            const chosenContainer = JSON.parse(container)
            setChosenProducts((p: any) => ([...p, chosenContainer]))
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === containerId && product.type === 'container') {
                        return {...product, name: chosenContainer.name, productId: chosenContainer.id, pack: chosenContainer.pack}
                    } else {
                        return product
                    }
                })
            }))

            checkAvailableLids(containerId);
            updatePriceByContainer(containerId);
        },

        changeContainerQuantity: (containerId: string, quantityString: string) => {

            const quantity = Number(quantityString)
            
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

            const container = receipt.products.find((p) => p.id === containerId && p.type === 'container') as ReceiptContainer;

            if ( container.lids.length === 1 ){
                setReceipt((p: Receipt) => (
                    {
                        ...p,
                        products: p.products.map((product) => {
                            if (product.id === containerId && product.type === 'container') {
                                return {
                                    ...product,
                                    lids: product.lids.map((lid) => {
                                        return {...lid, quantity, colors: lid.colors.length === 1 ? lid.colors.map((c) => ({...c, quantity}) ) : lid.colors}
                                    })
                                }
                            } else {
                                return product
                            }
                        })
                    }
                ))
            }

            updatePriceByContainer(containerId);
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

            updatePricesContainer(containerId);
        },

        changeLidQuantity: (containerId: string, lidId: string, quantityString: string) => {

            const quantity = Number(quantityString.replace(/^0+(?!$)/, ''));

            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === containerId && product.type === 'container') {
                        return {
                            ...product,
                            lids: product.lids.map((lid) => {
                                if (lid.id === lidId) {
                                    return {...lid, quantity}
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

            const container = receipt.products.find((p) => p.id === containerId && p.type === 'container') as ReceiptContainer;
            const lid = container.lids.find((l) => l.id === lidId);

            if ( lid?.colors.length === 1) {
                setReceipt((p: Receipt) => (
                    {
                        ...p,
                        products: p.products.map((product) => {
                            if (product.id === containerId && product.type === 'container') {
                                return {
                                    ...product,
                                    lids: product.lids.map((l) => {
                                        if (l.id === lidId) {
                                            return {...l, colors: l.colors.map((c) => ({...c, quantity}) )}
                                        } else {
                                            return l
                                        }
                                    })
                                }
                            } else {
                                return product
                            }
                        })
                    }
                ))
            }

            updatePriceByContainer(containerId);

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
                                                return {...c, [key]: key === 'quantity' ? Number(value) : value}
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
                                        colors: [...lid.colors, { name: crypto.randomUUID(), quantity: 0 }]
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
        },

        changePriceBy: (containerId: string, priceBy: PriceBy) => {
            setReceipt((p: Receipt) => {
                return ({...p, products: p.products.map((product) => {
                    if (product.id === containerId && product.type === 'container') {
                        return {...product, priceBy: priceBy}
                    } else {
                        return product
                    }
                })})
            })
        },

        changePriceByLid: (containerId: string, lidId: string, priceBy: PriceBy) => {
            setReceipt((p: Receipt) => {
                return ({...p, products: p.products.map((product) => {
                    if (product.id === containerId && product.type === 'container') {
                        return {
                            ...product,
                            lids: product.lids.map((lid) => {
                                if (lid.id === lidId) {
                                    return {...lid, priceBy: priceBy}
                                } else {
                                    return lid
                                }
                            })
                        }
                    } else {
                        return product
                    }
                })})
            })

            updatePricesContainer(containerId);
        },

        changeSpout: (containerId: string, lidId: string, spout: Spout) => {
            setReceipt((p: Receipt) => {
                return ({...p, products: p.products.map((product) => {
                    if (product.id === containerId && product.type === 'container') {
                        return {
                            ...product,
                            lids: product.lids.map((lid) => {
                                if (lid.id === lidId) {
                                    return {...lid, spout}
                                } else {
                                    return lid
                                }
                            })
                        }
                    } else {
                        return product
                    }
                })})
            })
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

    return { receipt, containerFun, lidFun, finishErrors, handleMiscChange, handleIsDelivery, handleFinish, handleAddProduct,  }
}

export default useForm;