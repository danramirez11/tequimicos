/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { PriceBy, Receipt, ReceiptChemical, ReceiptContainer, ReceiptContOnly, ReceiptLid, ReceiptMisc, Spout } from "../types/products";
import { Client, CombinationLid } from "../types/firebase";
import { useEffect } from "react";
import { addClienttoFirestore } from "../services/firestore";
import { useSelector } from "react-redux";
import { StoreType } from "../store/store";

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

    const emptyMisc: ReceiptMisc = {
        productId: '',
        id: '',
        type: 'misc',
        name: '',
        price: 0,
        priceUnit: 0,
        quantity: 0
    }

    const emptyContainerOnly: ReceiptContOnly = {
        priceBy: 'unit',
        productId: '',
        id: '',
        type: 'containerOnly',
        name: 'none',
        price: 0,
        quantity: 0,
        pack: 0
    }

    const [receipt , setReceipt] = useState<Receipt>({...emptyReceipt})
    const [chosenProducts, setChosenProducts] = useState<any>([])
    const [ finishErrors, setFinishErrors ] = useState<string[]>([' '])
    const [ clientForm, setClientForm ] = useState<Client>({id: '', name: ''})
    const [ clientErrors, setClientErrors ] = useState<string>('')

    const { clients } = useSelector((state: StoreType) => state.clients)

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
            print();
            setFinishErrors([' '])
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
        } else if (product === 'chemical') {
            setReceipt((p: Receipt) => ({...p, products: [...p.products, {...emptyChemical, id: crypto.randomUUID()}]}))
        } else if (product === 'misc') {
            setReceipt((p: Receipt) => ({...p, products: [...p.products, {...emptyMisc, id: crypto.randomUUID()}]}))
        } else {
            setReceipt((p: Receipt) => ({...p, products: [...p.products, {...emptyContainerOnly, id: crypto.randomUUID()}]}))
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

            if (prev.products.length === 0) {
                errors.push('Falta seleccionar productos');
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

            const chosenProduct = p.find((p: any) => p.id === productId);



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

    const updateLidPrice = (lidId: string, isPriceBySet?: boolean) => {

        setChosenProducts((p: any) => {



            setReceipt((prevReceipt) => {
                const productId = prevReceipt.products.find((p) => p.id === lidId && p.type === 'lid')?.productId;

                const chosenProduct = p.find((p: any) => p.id === productId);

                const updatedReceipt = {
                    ...prevReceipt.products.find((p) => p.id === lidId && p.type === 'lid') as ReceiptLid
                };
        
                const { quantity } = updatedReceipt;
    
                updatedReceipt.pack = updatedReceipt.pack || 0;
    
                const isPackGreater = updatedReceipt.pack >= 100;
    
                if ( !isPriceBySet ) {
                    if (quantity < 12) {
                        updatedReceipt.priceBy = 'unit';
                    } else if (quantity >= updatedReceipt?.pack) {
                        updatedReceipt.priceBy = isPackGreater ? 'pack' : quantity >= 100 ? 'hundred' : 'pack';
                    } else if ( quantity >= 100 ) {
                        updatedReceipt.priceBy = 'hundred';
                    } else {
                        updatedReceipt.priceBy = 'dozen';
                    }
                }

                updatedReceipt.price = chosenProduct.prices[updatedReceipt.priceBy] * quantity;
    
                return {
                    ...prevReceipt,
                    products: prevReceipt.products.map((product) => {
                        if (product.id === lidId && product.type === 'lid') {
                            return updatedReceipt;
                        } else {
                            return product;
                        }
                    })
                };
            })

            return p;

        })
        
    }

    const handleDeleteProduct = (id: string) => {
        setReceipt((p: Receipt) => ({...p, products: p.products.filter((product) => product.id !== id)}))
    }

    const reset = () => {
        setReceipt({...emptyReceipt})
        setFinishErrors([' '])
        setChosenProducts([])
    }

    const clientFun = {

        addClientInfo: (key: string, value: string) => {
            setClientForm((p: Client) => ({...p, [key]: value}))


            if (key === 'name') {
                console.log(value)
                if (clients.find((c) => c.name === value.trim())) {
                    setClientErrors('El cliente ya existe')
                } else {
                    setClientErrors('')
                }
            }
        },

        addClient: async () => {

            const clientAdded = await addClienttoFirestore({name: clientForm.name, id: clientForm.id ? clientForm.id : crypto.randomUUID()})

            if (clientAdded) {
                setReceipt((p: Receipt) => ({...p, client: clientForm.name}))
            }

        }
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
                                    return {...lid, name: chosenLid.name, productId: chosenLid.id, spout: chosenLid.name.toLowerCase().includes('pitorro') ? 'eco' : undefined}
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
        changeLid: (lidId: string, lid: string) => {
            const chosenLid = JSON.parse(lid)
            setChosenProducts((p: any) => ([...p, chosenLid]))
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === lidId && product.type === 'lid') {
                        return {...product, name: chosenLid.name, productId: chosenLid.id, pack: chosenLid.pack, spout: chosenLid.name.toLowerCase().includes('pitorro') ? 'eco' : undefined}
                    } else {
                        return product
                    }
                })
            }))

            updateLidPrice(lidId);
        },

        changeLidQuantity: (lidId: string, quantityString: string) => {
            const quantity = Number(quantityString)
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === lidId && product.type === 'lid') {
                        return {...product, quantity, colors: product.colors.length === 1 ? product.colors.map((c) => ({...c, quantity})) : product.colors}
                    } else {
                        return product
                    }
                })
            }))
            updateLidPrice(lidId);
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
                                    return {...c, [key]: key === 'quantity' ? Number(value) : value}
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
        },

        addLidColor: (lidId: string) => {
            console.log('añadir color arriba')
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === lidId && product.type === 'lid') {
                        console.log('añadir color')
                        return {
                            ...product,
                            colors: [...product.colors, { name: crypto.randomUUID(), quantity: 0 }]
                        }
                    } else {
                        return product
                    }
                })
            }))
        },

        deleteColor: (lidId: string, color: string) => {
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === lidId && product.type === 'lid') {
                        return {
                            ...product,
                            colors: product.colors.filter((c) => c.name !== color)
                        }
                    } else {
                        return product
                    }
                })
            }))
        },

        changePriceBy: (lidId: string, priceBy: PriceBy) => {
            setReceipt((p: Receipt) => {
                return ({...p, products: p.products.map((product) => {
                    if (product.id === lidId && product.type === 'lid') {
                        return {...product, priceBy: priceBy}
                    } else {
                        return product
                    }
                })})
            })

            updateLidPrice(lidId, true)
        },

        changeSpout: (lidId: string, spout: Spout) => {
            setReceipt((p: Receipt) => {
                return ({...p, products: p.products.map((product) => {
                    if (product.id === lidId && product.type === 'lid') {
                        return {...product, spout}
                    } else {
                        return product
                    }
                })})
            })
        
        updateLidPrice(lidId, true);
        }    
    }

    //CHEMICAL HANDLERS

    //MISC HANDLERS

    const miscFun = {
        changeName: (miscId: string, name: string) => {
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === miscId && product.type === 'misc') {
                        return {...product, name}
                    } else {
                        return product
                    }
                })
            }))
        },

        changeQuantity: (miscId: string, quantityString: string) => {
            const quantity = Number(quantityString)
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === miscId && product.type === 'misc') {
                        return {...product, quantity, price: product.priceUnit * quantity}
                    } else {
                        return product
                    }
                })
            }))
        },

        changePrice: (miscId: string, priceString: string) => {
            const priceUnit = Number(priceString)
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === miscId && product.type === 'misc') {
                        return {...product, priceUnit, price: product.quantity * priceUnit}
                    } else {
                        return product
                    }
                })
            }))
        },
    }

    //CONTAINER ONLY HANDLRES

    const updateContainerOnlyPrices = (containerId: string, isPriceBySet?: boolean) => {
        setChosenProducts((p: any) => {
            
            setReceipt((prevReceipt) => {

                const productId = prevReceipt.products.find((p) => p.id === containerId && p.type === 'containerOnly')?.productId;

                const chosenProduct = p.find((p: any) => p.id === productId);

                const updatedReceipt = {
                    ...prevReceipt.products.find((p) => p.id === containerId && p.type === 'containerOnly') as ReceiptContOnly
                };

                console.log(chosenProduct)
        
                const { quantity } = updatedReceipt;
    
                updatedReceipt.pack = updatedReceipt.pack || 0;
    
                const isPackGreater = updatedReceipt.pack >= 100;
    
                if ( !isPriceBySet ) {
                    if (quantity < 12) {
                        updatedReceipt.priceBy = 'unit';
                    } else if (quantity >= updatedReceipt?.pack) {
                        updatedReceipt.priceBy = isPackGreater ? 'pack' : quantity >= 100 ? 'hundred' : 'pack';
                    } else if ( quantity >= 100 ) {
                        updatedReceipt.priceBy = 'hundred';
                    } else {
                        updatedReceipt.priceBy = 'dozen';
                    }
                }

                updatedReceipt.price = chosenProduct.prices[updatedReceipt.priceBy] * quantity;
    
                return {
                    ...prevReceipt,
                    products: prevReceipt.products.map((product) => {
                        if (product.id === containerId && product.type === 'containerOnly') {
                            return updatedReceipt;
                        } else {
                            return product;
                        }
                    })
                };
            });

            return p;
        })
    }

    const containerOnlyFun = {
        changeContainer: (containerId: string, container: string) => {
            const chosenContainer = JSON.parse(container)
            setChosenProducts((p: any) => ([...p, chosenContainer]))
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === containerId && product.type === 'containerOnly') {
                        return {...product, name: chosenContainer.name, productId: chosenContainer.id, pack: chosenContainer.pack}
                    } else {
                        return product
                    }
                })
            }))

            updateContainerOnlyPrices(containerId);
        },

        changeQuantity: (containerId: string, quantityString: string) => {
            const quantity = Number(quantityString)
            setReceipt((p: Receipt) => ({
                ...p,
                products: p.products.map((product) => {
                    if (product.id === containerId && product.type === 'containerOnly') {
                        return {...product, quantity}
                    } else {
                        return product
                    }
                })
            }))

            updateContainerOnlyPrices(containerId);
        },

        changePriceBy: (containerId: string, priceBy: PriceBy) => {
            setReceipt((p: Receipt) => {
                return ({...p, products: p.products.map((product) => {
                    if (product.id === containerId && product.type === 'containerOnly') {
                        return {...product, priceBy: priceBy}
                    } else {
                        return product
                    }
                })})
            })

            updateContainerOnlyPrices(containerId, true);
        }
    }

    return { receipt, containerFun, lidFun, finishErrors, handleMiscChange, handleIsDelivery, handleFinish, handleAddProduct, handleDeleteProduct, clientFun, clientErrors, miscFun, containerOnlyFun }
}

export default useForm;