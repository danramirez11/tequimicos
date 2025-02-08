import { useContext } from "react";
import { ReceiptMisc } from "../../../types/products";
import { FormContext } from "../../../context/formContext";

type MiscFormProps = {
    product: ReceiptMisc;
}

const MiscForm = ({product}: MiscFormProps) => {
    const formContext = useContext(FormContext);
    const { miscFun, handleDeleteProduct} = formContext!;

    return (
        <section className="selling-form-product">
            <div className="flex misc-product">
                <input type="text" placeholder="Nombre" value={product.name} onChange={(e) => miscFun.changeName(product.id, e.target.value)}/>

                <label htmlFor="quantity">Cantidad</label>
                <input className="small" type="number" placeholder="Cantidad" onChange={(e) => miscFun.changeQuantity(product.id, e.target.value)} name="quantity" value={product.quantity}/>
                <label htmlFor="unitprice">Precio unidad</label>
                
                <input className="small" type="number" min={0} placeholder="Precio unidad" onChange={(e) => miscFun.changePrice(product.id, e.target.value)} name="unitprice" value={product.priceUnit}/>
                <button className="red-simple" type="button" onClick={() => handleDeleteProduct(product.id)}>X</button>
            </div>

            {
                product.name === '' && <p className="error">Falta nombre</p>
            }
            {
                product.quantity === 0 && <p className="error">Falta cantidad</p>
            }
            {
                product.priceUnit === 0 && <p className="error">Falta precio por unidad</p>
            }
            <h4 className="price">$ {product.price}</h4>
        </section>
    )
}

export default MiscForm;