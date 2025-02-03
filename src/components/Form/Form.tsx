import { useContext, useEffect, useRef } from "react";

// Declare $ property on window object
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $: any;
  }
}
import { FormContext } from "../../context/formContext";
import ContainerForm from "./FormComp/Cont";
import './Form.css'
import { useSelector } from "react-redux";
import { StoreType } from "../../store/store";
import LidForm from "./FormComp/Lid";
import ContOnlyForm from "./FormComp/ContOnly";
import MiscForm from "./FormComp/Misc";

const Form = () => {
    const formContext = useContext(FormContext);
    
    const { receipt, handleMiscChange, handleIsDelivery, handleFinish, handleAddProduct, finishErrors, clientFun, clientErrors, receiptFun } = formContext!;
    
    const { clients } = useSelector((state: StoreType) => state.clients)

    const clientSelectRef = useRef(null)

    useEffect(() => {
          const $select = window.$(clientSelectRef.current);
          if ($select.length > 0) {
            $select.selectpicker("val", receipt.client); // Manually update value
            $select.selectpicker("refresh");
          }
      
    }, [receipt]);

    const personals = ['Valentina', 'Sebastian', 'Zulay', 'Dufay']
    const paymentMethods = ['Efectivo','Transferencia', 'Nequi', 'Tarjeta']


    if (receipt.id === 'none') {
        return (
            <form className="selling-form">
            <p>No hay pedidos actualmente</p>
            </form>
        )
    }

    return (
            <form className="selling-form">
            <div className="flex">
            <select ref={clientSelectRef} name="client" id="" className="selectpicker w-50" data-live-search="true" value={receipt.client} onChange={(e) => handleMiscChange(e.target.name, e.target.value)}>
                <option value="none">Seleccionar cliente</option>   
                <option value="add">Añadir cliente</option>
                { clients.map((c, i) => 
                    <option key={i} value={c.name}>{c.name}</option>
                )}
            </select>
            <h5>Cliente: {receipt.client}</h5>
            <button className="red form-delete-btn" type="button" onClick={() => receiptFun.deleteReceipt(receipt.id)}>X</button>
            </div>

            {
                receipt.client === 'add' &&
                <>
                <div className="flex">
                    <input type="text" name="name" placeholder="Nombre del cliente" required onChange={(e) => clientFun.addClientInfo(e.target.name, e.target.value)}/>
                    <input type="text" name="id" placeholder="Cédula" onChange={(e) => clientFun.addClientInfo(e.target.name, e.target.value)}/>
                    <button className="green" type="button" disabled={clientErrors === '' ? false : true} onClick={() => clientFun.addClient()}>Añadir</button>
                </div>
                <p className="error">{clientErrors}</p>
                </>
            }

            { receipt.products.map((p) => {
                if (p.type === 'container') {
                    return <ContainerForm key={p.id} container={p}/>
                } else if (p.type === 'lid') {
                    return <LidForm key={p.id} lid={p}/>
                } else if (p.type === 'chemical') {
                    return <p key={p.id}>chemical</p>
                } else if (p.type === 'containerOnly') {
                    return <ContOnlyForm key={p.id} container={p}/>
                } else {
                    return <MiscForm key={p.id} product={p}/>
                }
            })}

            <h3 className="price">Total: $ {receipt.total}</h3>

            <div className="selling-form-btn">
            <p>añadir</p>
            <button className="green" type="button" onClick={() => handleAddProduct('container')}>Combo</button>
            <button className="green" type="button" onClick={() => handleAddProduct('containerOnly')}>Envase</button>
            <button className="green" type="button" onClick={() => handleAddProduct('lid')}>Tapa</button>
            <button className="green" type="button" onClick={() => handleAddProduct('misc')}>Producto</button>
            </div>

            <p>Personal</p>
            <div className="selling-form-btn">
            { personals.map((p, i) => 
            <button type="button" key={i}
                onClick={() => handleMiscChange('personal', p)} 
                className={p === receipt.personal ? 'blue' : 'outline'}>
                    {p}
            </button> )
            }
            </div>
            
            <p>Método de Pago</p>
            <div className="selling-form-btn">
            { paymentMethods.map((p, i) => 
            <button type="button" key={i}
                onClick={() => handleMiscChange('payment', p)}
                className={p === receipt.payment ? 'blue' : 'outline'}
                >
                    {p}
            </button>
            )}
            </div>

            <div className="form-delivery">
            <input type="checkbox" name="isDelivery" onChange={() => handleIsDelivery()} checked={receipt.isDelivery}/>
            <label htmlFor="isDelivery">Domicilio</label>
            </div>

            <button className="green" type="button" onClick={() => handleFinish()}>Finalizar</button>

            { finishErrors.map((e, i) => <p className="error" key={i}>{e}</p>) }


            </form>
            
    );
}

export default Form;