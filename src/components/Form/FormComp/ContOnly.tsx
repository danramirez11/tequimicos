import { useContext, useEffect, useRef, useState } from "react";
import { ReceiptContOnly } from "../../../types/products";
import { FormContext } from "../../../context/formContext";
import { StoreType } from "../../../store/store";
import { useSelector } from "react-redux";
import { FaExchangeAlt, FaExclamationCircle } from "react-icons/fa";

type ContOnlyFormProps = {
    container: ReceiptContOnly;
}

const ContOnlyForm = ({container}: ContOnlyFormProps) => {
    const formContext = useContext(FormContext);
    const { containerOnlyFun, handleDeleteProduct } = formContext!;
    const { combinations, loading } = useSelector((state: StoreType) => state.combinations)
    const [ isCustomPrice, setIsCustomPrice ] = useState(false);

    const handleCustomPrice = () => {
        console.log('clicked')
        setIsCustomPrice((p) => {
            if ( p === false ){
                return true
            } else {
                containerOnlyFun.changeQuantity(container.id, container.quantity.toString())
                return false
            }
        })
    }

    const contOnlySelectRef = useRef(null)

    useEffect(() => {
                  const $select = window.$(contOnlySelectRef.current);
                  if ($select.length > 0) {
                    $select.selectpicker("val", container.productId); // Manually update value
                    $select.selectpicker("refresh");
                  }
              
    }, [container.productId]);

    return (
        <section className="selling-form-product">
            { loading && <p>Cargando..</p> }

            <div className="flex">
                <select onChange={(e) => containerOnlyFun.changeContainer(container.id, e.target.value)} name="container" className="selectpicker search-box w-100" data-live-search="true" ref={contOnlySelectRef}>
                    <option value="none">Seleccionar envase</option>
                    { combinations.map((c) => 
                        <option key={c.id} value={c.id}>{c.name}</option>
                    )}
                </select>
                <input type="number" min={0} placeholder="Cantidad" onChange={(e) => containerOnlyFun.changeQuantity(container.id, e.target.value)} value={container.quantity}/>
                <select name="priceBy" value={container.priceBy} onChange={(e) => containerOnlyFun.changePriceBy(container.id, e.target.value)} className="small">
                    <option value="unit">Unidad</option>
                    <option value="dozen">Docena</option>
                    <option value="hundred">Cien</option>
                    <option value="pack">Paca</option>
                </select>
                <button className="red-simple" type="button" onClick={() => handleDeleteProduct(container.id)}>X</button>
            </div>

            {
                container.name === 'none' && <p className="error"><FaExclamationCircle/>Falta seleccionar envase</p>
            }
            {
                container.quantity === 0 && <p className="error"><FaExclamationCircle/>Falta cantidad</p>
            }

            <h4 className="price">$ {container.price}</h4>

            <div className="flex unit-price">
                <button className="yellow-simple" onClick={() => handleCustomPrice()} type="button"><FaExchangeAlt/></button> 

                {
                    isCustomPrice ?
                    <input type="number" min={0} placeholder="Precio unidad" onChange={(e) => containerOnlyFun.changeUnitPrice(container.id, e.target.value)} value={container.price > 0 && container.quantity > 0 ? container.price / container.quantity : 0}/>
                    :
                    <h5 className="price"> {container.price > 0 && container.quantity > 0 ? container.price / container.quantity : ''}</h5>
                }
                
            </div>
            
        </section>
    );
}

export default ContOnlyForm;