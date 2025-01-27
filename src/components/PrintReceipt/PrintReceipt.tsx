import { useContext } from "react";
import { FormContext } from "../../context/formContext";
import './PrintReceipt.css'

const PrintReceipt = () => {
        const formContext = useContext(FormContext);
        const { receipt } = formContext!;

    return (
        <section className="print-receipt">
            <p>TODO ENVASES Y QUÍMICOS</p>

            <p>{receipt.date} - {receipt.hour}</p>

            <p>Cliente: {receipt.client}</p>

            <p><b>Productos</b></p>

            { receipt.products.map((p) => {
                if (p.type === 'container') {
                    return (
                        <div key={p.id}>
                            <p><b>{p.quantity}</b> {p.name}</p>
                            {
                                p.lids.map((l) => {
                                    return (
                                        <div className="indent" key={l.id}>
                                            <p><b>{l.quantity}</b> {l.name}</p>
                                            <p>{l.spout ? l.spout === 'eco' ? 'Económico' : 'Laboratorio' : ''}</p>
                                            {
                                                l.colors.map((c) => {
                                                    return (
                                                        <div className="indent" key={c.name}>
                                                            <p>{c.quantity} {c.name}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                            <p className="price">$ {p.price}</p>
                        </div>
                    )
                } else if (p.type === 'lid') {
                    return (
                        <div key={p.id}>
                            <p><b>{p.quantity}</b> {p.name}</p>
                            {
                                p.colors.map((c) => {
                                    return (
                                        <div className="indent" key={c.name}>
                                            <p>{c.quantity} {c.name}</p>
                                        </div>
                                    )
                                })
                            }
                            <p className="price">$ {p.price}</p>
                        </div>
                    )
                } else {
                    return <p>nothing here</p>
                }
            })}

            <p>______________________________</p>

            <p className="price">Total: $ {receipt.total}</p>
        </section>
    );
}

export default PrintReceipt;