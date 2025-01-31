import { useContext, useState } from "react";
import { FormContext } from "../../../context/formContext";
import { ReceiptContainer } from "../../../types/products";
import { useSelector } from "react-redux";
import { StoreType } from "../../../store/store";
import useSelectPicker from "../../../hooks/useSelectPicker";
import { FaExchangeAlt, FaExclamationCircle } from "react-icons/fa";
import { lazoColorsId } from "../../../utils/images";

type ContainerProps = {
    container: ReceiptContainer;
}

const ContainerForm = ({container}: ContainerProps) => {
    useSelectPicker();
    const formContext = useContext(FormContext);
    const { containerFun, handleDeleteProduct } = formContext!;
    const { combinations, loading } = useSelector((state: StoreType) => state.combinations)
    const { lids } = useSelector((state: StoreType) => state.lids)

    const [ customPrices, setCustomPrices ] = useState<string[]>([])

    const handleCustomPrices = (lidId: string) => {
        setCustomPrices((p) => {
            if ( p.includes(lidId) ){
                containerFun.changeLidQuantity(container.id, lidId, container.lids.find(l => l.id === lidId)!.quantity.toString())
                return p.filter((c) => c !== lidId)
            } else {
                return [...p, lidId]
            }
        })
    }


    return (
        <section className="selling-form-product">
            { loading && <p>Cargando...</p>}

            <div className="flex">
            <select onChange={(e) => containerFun.changeContainer(container.id, e.target.value)} name="container" className="selectpicker search-box w-100" data-live-search="true">
                <option value="none">Seleccionar envase</option>
                { combinations.map((c, i) => 
                    <option key={i} value={JSON.stringify(c)}>{c.name}</option>
                )}
            </select>

            <input type="number" placeholder="Cantidad" onChange={(e) => containerFun.changeContainerQuantity(container.id, e.target.value)}/>



            <button className="red-simple" type="button" onClick={() => handleDeleteProduct(container.id)}>X</button>
            </div>
            

            <div className="indentation">
            { container.name !== 'none' && container.lids.map((l) => {
                return (
                    
                    <div key={l.id} className="selling-lid-container">
                        <div className="flex">
                        <select onChange={(e) => containerFun.changeLid(container.id, l.id, e.target.value)} name="lid" value={JSON.stringify({ name: l.name, id: l.productId})}>
                            <option value="none">Sin tapa</option>
                            { combinations.find(c => c.name === container.name)!.lids.map((lid) => 
                                <option key={lid.id} value={JSON.stringify({ name: lid.name, id: lid.id})}>{lid.name}</option>
                            )}
                        </select>
                        { l.name.toLowerCase().includes("pitorro") && 
                            <select name="spout" onChange={(e) => containerFun.changeSpout(container.id, l.id, e.target.value)} value={l.spout || 'eco'}>
                                <option value="eco">Anterior</option>
                                <option value="lab">Laboratorio</option>
                            </select>
                        }
                        <input type="number" placeholder="Cantidad" onChange={(e) => containerFun.changeLidQuantity(container.id, l.id, e.target.value)} value={l.quantity}/>
                        <select name="priceBy" className="small" onChange={(e) => containerFun.changePriceByLid(container.id, l.id, e.target.value)} value={l.priceBy}>
                            <option value="unit">Unidad</option>
                            <option value="dozen">Docena</option>
                            <option value="hundred">Cien</option>
                            <option value="pack">Paca</option>
                        </select>
                        <button type="button" className="red-simple" onClick={() => containerFun.deleteLid(container.id, l.id)}>X</button>
                        </div>

                        <div className="indentation">
                        {   l.name !== 'none' && 
                            l.colors.map((color) => {
                                return (
                                    <div key={color.name} className="flex">
                                        <select onChange={(e) => containerFun.changeLidColor(container.id, l.id, color.name, 'name', e.target.value)} name="color" className="simple" value={color.name}>
                                            <option value="none">Seleccionar color</option>
                                            { 
                                                lids.find(lid => lid.id === l.productId) && Object.keys(lids.find(lid => lid.id === l.productId)?.colors || {}).map((c) => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))
                                            }
                                        </select>
                                        <input type="number" placeholder="Cantidad" onChange={(e) => containerFun.changeLidColor(container.id, l.id, color.name, 'quantity', e.target.value)} value={color.quantity} className="opacity"/>
                                        <button type="button" className="red-simple" onClick={() => containerFun.deleteLidColor(container.id, l.id, color.name)}>X</button>
                                    </div>
                                )
                            })
                        }
                        {
                            l.name.toLowerCase().includes('lazo') && l.lazo &&
                            <div className="indentation">
                            {
                                l.lazo.map((lazo) => {
                                    return (
                                        <div key={lazo.name} className="flex">
                                            <select onChange={(e) => containerFun.changeLazo(container.id, l.id, lazo.name, 'name', e.target.value)} name="lazo" className="simple" value={lazo.name}>
                                                <option value="none">Seleccionar lazo</option>
                                                { 
                                                    lids.find(lid => lid.id === lazoColorsId) && Object.keys(lids.find(lid => lid.id === lazoColorsId)?.colors || {}).map((c) => (
                                                        <option key={c} value={c}>lazo: {c}</option>
                                                    ))
                                                }
                                            </select>
                                            <input type="number" placeholder="Cantidad" onChange={(e) => containerFun.changeLazo(container.id, l.id, lazo.name, 'quantity', e.target.value)} value={lazo.quantity} className="opacity"/>
                                            <button type="button" className="red-simple" onClick={() => containerFun.deleteLazo(container.id, l.id, lazo.name)}>X</button>
                                        </div>
                                    )
                                })
                            }
                            <button type="button" className="blue-simple" onClick={() => containerFun.addLazo(container.id, l.id)}>+ añadir lazo</button>
                            </div>
                        }
                        {
                            <button type="button" className="blue-simple" onClick={() => containerFun.addLidColor(container.id, l.id)}>+ añadir color</button>
                        }
                        { 
                            l.quantity !== l.colors.reduce((acc, color) => acc + color.quantity, 0) && <p className="error"> <FaExclamationCircle/>Colores no coinciden</p>
                        }
                        {
                            l.name === 'none' && <p className="error"> <FaExclamationCircle/>Falta seleccionar tapa</p>
                        }
                        {
                            ( l.colors.length === 0 || l.name === 'none') && <p className="error"> <FaExclamationCircle/>Falta seleccionar colores</p>
                        }

                        <div className="flex unit-price">
                            <button className="yellow-simple" type="button" onClick={() => handleCustomPrices(l.id)}><FaExchangeAlt/></button>

                            <h5 className="price">$ {l.price}</h5>
                            {
                                customPrices.includes(l.id) ?
                                <input type="number" placeholder="Precio unidad" onChange={(e) => containerFun.changeLidUnitPrice(container.id, l.id, e.target.value)} value={l.price > 0 && l.quantity > 0 ? l.price / l.quantity : 0}/>
                                :
                                <h5 className="price"> ( {l.price > 0 && l.quantity > 0 ? l.price / l.quantity : ''} )</h5>
                            }

                            
                        </div>
                        </div>
                    </div>
                    
                )
            })}

            { container.name !== 'none' && <button type="button" className="blue" onClick={() => containerFun.addLid(container.id)}>añadir tapa</button>}
            </div>

            <h4 className="price">$ {container.price}</h4>

            { container.quantity !== container.lids.reduce((acc, lid) => acc + lid.quantity, 0) && <p className="error"> <FaExclamationCircle/>La cantidad de envases y tapas no coincide</p>}

            { container.name === 'none' && <p className="error"> <FaExclamationCircle/>Falta seleccionar envase</p>}

            {
                container.quantity === 0 && <p className="error"> <FaExclamationCircle/>Falta cantidad</p>
            }


        </section>
    )
}

export default ContainerForm;