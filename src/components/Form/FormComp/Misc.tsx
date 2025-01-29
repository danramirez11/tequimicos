import { ReceiptMisc } from "../../../types/products";

type MiscFormProps = {
    product: ReceiptMisc;
}

const MiscForm = ({product}: MiscFormProps) => {
    return (
        <section className="selling-form-product">
            <div className="flex">
                <input type="text" placeholder="Nombre" value={product.name}/>
                <input type="number" placeholder="Cantidad"/>
                <input type="number" placeholder="Precio unidad" />
                <button className="red-simple" type="button">X</button>
            </div>
            <h4 className="price">$ {product.price}</h4>
        </section>
    )
}

export default MiscForm;