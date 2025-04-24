import { useSelector } from "react-redux";
import { StoreType } from "../../../store/store";
import { ReceiptLid } from "../../../types/products";
import { FaExchangeAlt, FaExclamationCircle } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "../../../context/formContext";
import useSelectPicker from "../../../hooks/useSelectPicker";
import { lazoColorsId } from "../../../utils/images";

type LidFormProps = {
    lid: ReceiptLid,
}

const LidForm = ({lid}: LidFormProps) => {
    useSelectPicker();
    const { lids, loading } = useSelector((state: StoreType) => state.lids)
    const formContext = useContext(FormContext);
    const { lidFun, handleDeleteProduct } = formContext!;
    const [ isCustomPrice, setIsCustomPrice ] = useState(false);

    const handleCustomPrice = () => {
        setIsCustomPrice((p) => {
            if ( p === false ){
                return true
            } else {
                lidFun.changeLidQuantity(lid.id, lid.quantity.toString())
                return false
            }})
    }

    const lidSelectRef = useRef(null)

    useEffect(() => {
                      const $select = window.$(lidSelectRef.current);
                      if ($select.length > 0) {
                        $select.selectpicker("val", lid.productId); // Manually update value
                        $select.selectpicker("refresh");
                      }
                  
    }, [lid.productId]);

    if (loading) return <p>Cargando...</p>

    return (
        <section className="selling-form-product">

            <div className="flex">
                <select name="lid" className="selectpicker search-box w-100" data-live-search="true" onChange={(e) => lidFun.changeLid(lid.id, e.target.value)} ref={lidSelectRef}>
                    <option value="none">Seleccionar tapa</option>
                    { lids.map((l, i) => 
                        l.canBeSellAlone !== false && <option key={i} value={l.id}>{l.name}</option>
                    )}
                </select>
                {
                    lid.name.toLowerCase().includes("pitorro") && 
                    <select name="spout" id="">
                        <option value="eco">Anterior</option>
                        <option value="lab">Laboratorio</option>
                    </select>
                }
                <input type="number" min={0} placeholder="Cantidad" className="quantity" onChange={(e) => lidFun.changeLidQuantity(lid.id, e.target.value)} value={lid.quantity}/>
                <select name="priceBy" onChange={(e) => lidFun.changePriceBy(lid.id, e.target.value)} value={lid.priceBy} id="" className="small">
                    <option value="unit">Unidad</option>
                    <option value="dozen">Docena</option>
                    <option value="hundred">Cien</option>
                    <option value="pack">Paca</option>
                </select>
                <button className="red-simple" type="button" onClick={() => handleDeleteProduct(lid.id)}>X</button>
            </div>

            <div className="indentation">
            { lid.name !== 'none' && lid.colors.map((c) => {
                return (
                    <div key={c.name} className="flex indentation">
                        <select name="name" id="" className="simple" value={c.name} onChange={(e) => lidFun.changeLidColor(lid.id, c.name, 'name', e.target.value)}>
                            <option value="none">Seleccionar color</option>
                            <option value="mixed">surtidas</option>
                            {
                                lids.find(l => l.id === lid.productId) && Object.keys(lids.find(l => l.id === lid.productId)!.colors || {}).map((color) =>
                                    <option key={color} value={color}>{color}</option>)
                            }
                        </select>
                        <input type="number" min={0} placeholder="Cantidad" value={c.quantity} onChange={(e) => lidFun.changeLidColor(lid.id, c.name, 'quantity', e.target.value)}/>
                        <button className="red-simple" type="button" onClick={() => lidFun.deleteColor(lid.id, c.name)}>X</button>
                    </div>
                )
            })}

            {
                lid.lazo && lid.name.toLowerCase().includes('lazo') &&
                <div className="indentation">
                    {
                        lid.lazo.map((l) => {
                            return (
                                <div key={l.name} className="flex indentation">
                                    <select name="name" id="" className="simple" value={l.name} onChange={(e) => lidFun.changeLidLazo(lid.id, l.name, 'name', e.target.value)}>
                                        <option value="none">Seleccionar lazo</option>
                                        {
                                            lids.find(li => li.id === lazoColorsId) && Object.keys(lids.find(li => li.id === lazoColorsId)!.colors || {}).map((color) =>
                                                <option key={color} value={color}>lazo: {color}</option>)
                                        }
                                    </select>
                                    <input type="number" min={0} placeholder="Cantidad" value={l.quantity} onChange={(e) => lidFun.changeLidLazo(lid.id, l.name, 'quantity', e.target.value)}/>
                                    <button className="red-simple" type="button" onClick={() => lidFun.deleteLazo(lid.id, l.name)}>X</button>
                                </div>
                            )
                        })
                    }
                    <button type="button" className="blue-simple" onClick={() => lidFun.addLazo(lid.id)}>+ añadir lazo</button>
                </div>
            }
            
            <button type="button" className="blue-simple" onClick={() => lidFun.addLidColor(lid.id)}>+ añadir color</button>
            
            {
                lid.quantity !== lid.colors.reduce((acc, c) => acc + c.quantity, 0) && <p className="error"><FaExclamationCircle/> La cantidad de colores no coincide con la cantidad de tapas</p>
            }
            {
                lid.name === 'none' && <p className="error"><FaExclamationCircle/> Falta seleccionar tapa</p>
            }
            {
                lid.colors.length === 0 && lid.name !== 'none' && <p className="error"><FaExclamationCircle/> Falta seleccionar colores</p>
            }
            {
                lid.quantity === 0 && <p className="error"><FaExclamationCircle/> Falta cantidad</p>
            }
            
            <h4 className="price">$ {lid.price}</h4>

            <div className="flex unit-price">
                <button className="yellow-simple" onClick={() => handleCustomPrice()} type="button"><FaExchangeAlt/></button>
                {
                    isCustomPrice ?
                    <input type="number" min={0} placeholder="Precio unidad" onChange={(e) => lidFun.changeUnitPrice(lid.id, e.target.value)} value={lid.price > 0 && lid.quantity > 0 ? lid.price / lid.quantity : 0}/>
                    :
                    <h5 className="price">{lid.price > 0 && lid.quantity > 0 ? lid.price / lid.quantity : ''}</h5>
                }
            </div>
            </div>
        </section>
    );
}

export default LidForm