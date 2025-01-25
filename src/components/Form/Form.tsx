import { useContext } from "react";
import { FormContext } from "../../context/formContext";
import ContainerForm from "./FormComp/Cont";
import './Form.css'
import useSelectPicker from "../../hooks/useSelectPicker";
import { useSelector } from "react-redux";
import { StoreType } from "../../store/store";
import LidForm from "./FormComp/Lid";

const Form = () => {
    const formContext = useContext(FormContext);
    useSelectPicker();
    const { receipt, handleMiscChange, handleIsDelivery, handleFinish, handleAddProduct, finishErrors } = formContext!;
    const { clients } = useSelector((state: StoreType) => state.clients)

    const personals = ['Valentina', 'Sebastian', 'Zulay', 'Dufay']
    const paymentMethods = ['Efectivo','Transferencia']


    return (
            <form className="selling-form">
            <select name="client" id="" className="selectpicker w-50" data-live-search="true" onChange={(e) => handleMiscChange(e.target.name, e.target.value)}>
                <option value="none">Seleccionar cliente</option>
                { clients.map((c, i) => 
                    <option key={i} value={c.name}>{c.name}</option>
                )}
            </select>

            { receipt.products.map((p) => {
                if (p.type === 'container') {
                    return <ContainerForm key={p.id} container={p}/>
                } else if (p.type === 'lid') {
                    return <LidForm key={p.id} lid={p}/>
                } else {
                    return <p key={p.id}>chemical</p>
                }
            })}

            <h3 className="price">Total: $ {receipt.total}</h3>

            <div className="selling-form-btn">
            <p>añadir</p>
            <button className="green" type="button" onClick={() => handleAddProduct('container')}>Envase</button>
            <button className="green" type="button" onClick={() => handleAddProduct('lid')}>Tapa</button>
            <button className="green" type="button" onClick={() => handleAddProduct('chemical')}>Químico</button>
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
            <input type="checkbox" name="isDelivery" onClick={() => handleIsDelivery()}/>
            <label htmlFor="isDelivery">Domicilio</label>
            </div>

            <button className="green" type="button" onClick={() => handleFinish()}>Finalizar</button>

            { finishErrors.map((e, i) => <p className="error" key={i}>{e}</p>) }

            <p>{JSON.stringify(receipt.products[0])}</p>

            </form>
            
    );
}

export default Form;