import { useContext } from "react";
import { FormContext } from "../../context/formContext";
import './PrintReceipt.css'

const PrintReceipt = () => {
        const formContext = useContext(FormContext);
        const { receipt } = formContext!;

    return (
        <section className="print-receipt">
            <p>Orden de pedido</p>

            <p>{receipt.isDelivery ? 'Domicilio' : 'Punto de venta'}</p>

            <p>Pago: {receipt.payment}</p>

            <p>Cliente: {receipt.client}</p>

            <br />

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

            <p>______________________________</p>

            <p>Observaciones:</p>

            <br /><br /><br /><br/><br/>

            <p>Alistó: </p>

            <br /><br />

            <p>______________________________</p>
        </section>
    );
}

export default PrintReceipt;