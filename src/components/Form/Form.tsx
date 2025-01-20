import { useContext } from "react";
import { FormContext } from "../../context/formContext";

const Form = () => {
    const formContext = useContext(FormContext);
    const { receipt, handleMiscChange, handleAddChemical, handleAddLid, handleAddContainer, handleIsDelivery, handleFinish } = formContext!;

    const personals = ['Valentina', 'Sebastian', 'Zulay']
    const paymentMethods = ['Efectivo','Transferencia']

    return (
            <form>
            <input type="text" placeholder="Cliente" name="client" value={receipt.client} onChange={(e) => handleMiscChange(e.target.name, e.target.value)}/>

            { receipt.products.map((p, i) => {
                if (p.type === 'container') {
                    return <p key={i}>container</p>
                } else if (p.type === 'lid') {
                    return <p key={i}>lid</p>
                } else {
                    return <p key={i}>chemical</p>
                }
            })}

            <h3>Total: {receipt.total}</h3>

            <p>añadir</p>
            <button type="button" onClick={() => handleAddContainer()}>Envase</button>
            <button type="button" onClick={() => handleAddLid()}>Tapa</button>
            <button type="button" onClick={() => handleAddChemical()}>Químico</button>

            <p>Personal</p>
            { personals.map((p, i) => 
            <button type="button" key={i}
                onClick={() => handleMiscChange('personal', p)} 
                className={p === receipt.personal ? 'button-selected' : ''}>
                    {p}
            </button> )
            }

            <p>Método de Pago</p>
            { paymentMethods.map((p, i) => 
            <button type="button" key={i}
                onClick={() => handleMiscChange('payment', p)}
                className={p === receipt.payment ? 'button-selected' : ''}
                >
                    {p}
            </button>
            )}

            <label htmlFor="isDelivery">Domicilio</label>
            <input type="checkbox" name="isDelivery" onClick={() => handleIsDelivery()}/>

            <button type="submit" onClick={() => handleFinish()}>Finalizar</button>

            </form>
    );
}

export default Form;