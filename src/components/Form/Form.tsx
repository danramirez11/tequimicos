import { useContext } from "react";
import { FormContext } from "../../context/formContext";
import ContainerForm from "./FormComp/Cont";
import './Form.css'

const Form = () => {
    const formContext = useContext(FormContext);
    const { receipt, handleMiscChange, handleIsDelivery, handleFinish, handleAddProduct } = formContext!;

    const personals = ['Valentina', 'Sebastian', 'Zulay']
    const paymentMethods = ['Efectivo','Transferencia']

    return (
            <form className="selling-form">
            <input type="text" placeholder="Cliente" name="client" value={receipt.client} onChange={(e) => handleMiscChange(e.target.name, e.target.value)}/>

            { receipt.products.map((p, i) => {
                if (p.type === 'container') {
                    return <ContainerForm key={i} container={p}/>
                } else if (p.type === 'lid') {
                    return <p key={i}>lid</p>
                } else {
                    return <p key={i}>chemical</p>
                }
            })}

            <h3>Total: {receipt.total}</h3>

            <div className="selling-form-btn">
            <p>añadir</p>
            <button className="bGreen" type="button" onClick={() => handleAddProduct('container')}>Envase</button>
            <button className="bGreen" type="button" onClick={() => handleAddProduct('lid')}>Tapa</button>
            <button className="bGreen" type="button" onClick={() => handleAddProduct('chemical')}>Químico</button>
            </div>

            <p>Personal</p>
            <div className="selling-form-btn">
            { personals.map((p, i) => 
            <button type="button" key={i}
                onClick={() => handleMiscChange('personal', p)} 
                className={p === receipt.personal ? 'bLightBlue' : 'bOutlined'}>
                    {p}
            </button> )
            }
            </div>
            
            <p>Método de Pago</p>
            <div className="selling-form-btn">
            { paymentMethods.map((p, i) => 
            <button type="button" key={i}
                onClick={() => handleMiscChange('payment', p)}
                className={p === receipt.payment ? 'bLightBlue' : 'bOutlined'}
                >
                    {p}
            </button>
            )}
            </div>

            <span>
            <input type="checkbox" name="isDelivery" onClick={() => handleIsDelivery()}/>
            <label htmlFor="isDelivery">Domicilio</label>
            </span>

            <button type="submit" onClick={() => handleFinish()}>Finalizar</button>

            </form>
            
    );
}

export default Form;