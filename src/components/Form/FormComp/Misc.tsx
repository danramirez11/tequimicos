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
            <div className="flex">
                <input type="text" placeholder="Nombre" value={product.name} onChange={(e) => miscFun.changeName(product.id, e.target.value)}/>
                <input type="number" placeholder="Cantidad" onChange={(e) => miscFun.changeQuantity(product.id, e.target.value)}/>
                <input type="number" placeholder="Precio unidad" onChange={(e) => miscFun.changePrice(product.id, e.target.value)}/>
                <button className="red-simple" type="button" onClick={() => handleDeleteProduct(product.id)}>X</button>
            </div>
            <h4 className="price">$ {product.price}</h4>
        </section>
    )
}

export default MiscForm;