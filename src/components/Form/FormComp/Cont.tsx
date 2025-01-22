import { useContext } from "react";
import { FormContext } from "../../../context/formContext";
import { ReceiptContainer } from "../../../types/products";
import { useSelector } from "react-redux";
import { StoreType } from "../../../store/store";
import useSelectPicker from "../../../hooks/useSelectPicker";

type ContainerProps = {
    container: ReceiptContainer;
}

const colors = ['Blanco', 'Rojo', 'Azul', 'Verde', 'Amarillo', 'Negro']

const ContainerForm = ({container}: ContainerProps) => {
    useSelectPicker();
    const formContext = useContext(FormContext);
    const { containerFun } = formContext!;
    const { combinations, loading } = useSelector((state: StoreType) => state.combinations)
    const { lids } = useSelector((state: StoreType) => state.lids) 

    console.log(container.lids[0].name, container.lids[0].productId)

    lids.forEach((l) => {
        if (l.name === container.lids[0].name) {
            console.log(`lid names: ${l.name + container.lids[0].name}`)
            console.log(`lid id: ${l.id + " receipt produc id:  " + container.lids[0].productId +  "  receipt lid id:" + container.lids[0].id}`)
        } else {
            console.log('dont found it ')
        }
    })


    return (
        <section className="selling-form-product">
            { loading && <p>Cargando...</p>}

            <div className="flex">
            <select onChange={(e) => containerFun.changeContainer(container.id, e.target.value)} name="container" className="selectpicker search-box" data-live-search="true">
                <option value="none">Seleccionar envase</option>
                { combinations.map((c, i) => 
                    <option key={i} value={JSON.stringify(c)}>{c.name}</option>
                )}
            </select>

            <input type="number" placeholder="Cantidad" onChange={(e) => containerFun.changeContainerQuantity(container.id, e.target.value)}/>

            <button className="red-simple" type="button">X</button>
            </div>
            

            <div className="indentation">
            { container.name !== 'none' && container.lids.map((l, i) => {
                return (
                    <>
                    <div key={i}>
                        <div className="flex">
                        <select onChange={(e) => containerFun.changeLid(container.id, l.id, e.target.value)} name="lid">
                            <option value="none">Sin tapa</option>
                            { combinations.find(c => c.name === container.name)!.lids.map((lid, i) => 
                                <option key={i} value={JSON.stringify(lid)}>{lid.name}</option>
                            )}
                        </select>
                        <input type="number" placeholder="Cantidad" onChange={(e) => containerFun.changeLidQuantity(container.id, l.id, e.target.value)}/>
                        <button type="button" className="red-simple" onClick={() => containerFun.deleteLid(container.id, l.id)}>X</button>
                        </div>

                        <div className="indentation">
                        {   l.name !== 'none' && 
                            l.colors.map((color, i) => {
                                return (
                                    <div key={i} className="flex">
                                        <select onChange={(e) => containerFun.changeLidColor(container.id, l.id, color.name, 'name', e.target.value)} name="color" className="simple">
                                            <option value="none">Seleccionar color</option>
                                            { colors.map((c, i) => 
                                                <option key={i} value={c}>{c}</option>
                                            )}
                                        </select>
                                        <input type="number" placeholder="Cantidad" onChange={(e) => containerFun.changeLidColor(container.id, l.id, color.name, 'quantity', e.target.value)}/>
                                        <button type="button" className="red-simple" onClick={() => containerFun.deleteLidColor(container.id, l.id, color.name)}>X</button>
                                    </div>
                                )
                            })
                        }
                        {
                            <button type="button" className="blue-simple" onClick={() => containerFun.addLidColor(container.id, l.id)}>+ añadir color</button>
                        }
                        </div>
                    </div>
                    </>
                )
            })}

            { container.name !== 'none' && <button type="button" className="blue" onClick={() => containerFun.addLid(container.id)}>añadir tapa</button>}
            </div>


        </section>
    )
}

export default ContainerForm;