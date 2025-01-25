import { useSelector } from "react-redux";
import { StoreType } from "../../../store/store";
import { ReceiptLid } from "../../../types/products";
import { FaExclamationCircle } from "react-icons/fa";

type LidFormProps = {
    lid: ReceiptLid,
}

const LidForm = ({lid}: LidFormProps) => {
    const { lids, loading } = useSelector((state: StoreType) => state.lids)

    if (loading) return <p>Cargando...</p>

    return (
        <section className="selling-form-product">

            <div className="flex">
                <select name="lid" className="selectpicker search-box w-100" data-live-search="true">
                    <option value="none">Seleccionar tapa</option>
                    { lids.map((l, i) => 
                        <option key={i} value={JSON.stringify(l)}>{l.name}</option>
                    )}
                </select>
                <input type="number" placeholder="Cantidad"/>
                <button className="red-simple" type="button">X</button>
            </div>

            <div className="indentation">
            { lid.name !== 'none' && lid.colors.map((c) => {
                return (
                    <div key={c.name} className="flex indentation">
                        <select name="name" id="" className="simple" value={c.name}>
                            <option value="none">Seleccionar color</option>
                            {
                                lids.find(l => l.id === lid.productId) && Object.keys(lids.find(l => l.id === lid.productId)!.colors || {}).map((color) =>
                                    <option key={color} value={color}>{color}</option>)
                            }
                        </select>
                        <input type="number" placeholder="Cantidad" value={c.quantity}/>
                        <button className="red-simple" type="button">X</button>
                    </div>
                )
            })}
            {
                <button type="button" className="blue-simple">+ añadir color</button>
            }
            {
                lid.quantity !== lid.colors.reduce((acc, c) => acc + c.quantity, 0) && <p className="error"><FaExclamationCircle/> La cantidad de colores no coincide con la cantidad de tapas</p>
            }
            {
                lid.name === 'none' && <p className="error"><FaExclamationCircle/> Falta seleccionar tapa</p>
            }
            {
                lid.colors.length === 0 && lid.name !== 'none' && <p className="error"><FaExclamationCircle/> Falta seleccionar colores</p>
            }
            <h5 className="price">$ {lid.price}</h5>
            </div>
        </section>
    );
}

export default LidForm