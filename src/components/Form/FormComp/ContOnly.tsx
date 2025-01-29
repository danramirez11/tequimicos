import { useContext } from "react";
import { ReceiptContOnly } from "../../../types/products";
import { FormContext } from "../../../context/formContext";
import useSelectPicker from "../../../hooks/useSelectPicker";
import { StoreType } from "../../../store/store";
import { useSelector } from "react-redux";

type ContOnlyFormProps = {
    container: ReceiptContOnly;
}

const ContOnlyForm = ({container}: ContOnlyFormProps) => {
    useSelectPicker();
    const formContext = useContext(FormContext);
    const { containerOnlyFun, handleDeleteProduct } = formContext!;
    const { combinations, loading } = useSelector((state: StoreType) => state.combinations)

    return (
        <section className="selling-form-product">
            { loading && <p>Cargando..</p> }

            <div className="flex">
                <select onChange={(e) => containerOnlyFun.changeContainer(container.id, e.target.value)} name="container" className="selectpicker search-box w-100" data-live-search="true">
                    <option value="none">Seleccionar envase</option>
                    { combinations.map((c) => 
                        <option key={c.id} value={JSON.stringify(c)}>{c.name}</option>
                    )}
                </select>
                <input type="number" placeholder="Cantidad" onChange={(e) => containerOnlyFun.changeQuantity(container.id, e.target.value)}/>
                <select name="priceBy" value={container.priceBy} onChange={(e) => containerOnlyFun.changePriceBy(container.id, e.target.value)} className="small">
                    <option value="unit">Unidad</option>
                    <option value="dozen">Docena</option>
                    <option value="hundred">Cien</option>
                    <option value="pack">Paca</option>
                </select>
                <button className="red-simple" type="button" onClick={() => handleDeleteProduct(container.id)}>X</button>
            </div>
        </section>
    );
}

export default ContOnlyForm;