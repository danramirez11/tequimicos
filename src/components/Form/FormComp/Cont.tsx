import { useContext } from "react";
import { combinations } from "../../../utils/fakeData";
import { FormContext } from "../../../context/formContext";
import { ReceiptContainer } from "../../../types/products";

type ContainerProps = {
    container: ReceiptContainer;
}

const colors = ['Blanco', 'Rojo', 'Azul', 'Verde', 'Amarillo', 'Negro']

const ContainerForm = ({container}: ContainerProps) => {
        const formContext = useContext(FormContext);
        const { handleProductChange, handleContainerLidChange, addColorToLid, addLidToContainer } = formContext!;

    return (
        <div>
            <select onChange={(e) => handleProductChange(container.id, 'name', e.target.value)} name="container">
                <option value="none">Seleccionar envase</option>
                { combinations.map((c, i) => 
                    <option key={i} value={c.name}>{c.name}</option>
                )}
            </select>
            <input type="number" placeholder="Cantidad" onChange={(e) => handleProductChange(container.id, 'quantity', e.target.value)}/>

            { container.name !== '' && container.lids.map((l, i) => {
                return (
                    <>
                    <div key={i}>
                        <select onChange={(e) => handleContainerLidChange(container.id, l.id, 'name', e.target.value)} name="lid">
                            <option value="none">Seleccionar tapa</option>
                            { combinations.find(c => c.name === container.name)!.lids.map((lid, i) => 
                                <option key={i} value={lid.name}>{lid.name}</option>
                            )}
                        </select>
                        <input type="number" placeholder="Cantidad" onChange={(e) => handleContainerLidChange(container.id, l.id, 'quantity', e.target.value)}/>
                    </div>
                    </>
                )
            })}
            { container.name !== '' && <button type="button" onClick={() => addLidToContainer(container.id)}>Añadir Tapa</button>}

        </div>
    )
}

export default ContainerForm;