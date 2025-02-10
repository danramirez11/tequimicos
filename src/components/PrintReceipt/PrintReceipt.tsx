import { useContext } from "react";
import { FormContext } from "../../context/formContext";
import './PrintReceipt.css'
import { formatDate } from "../../utils/functions";
import { Receipt } from "../../types/products";

type PrintReceiptProps = {
    historyReceipt?: Receipt;
}

const PrintReceipt = ({historyReceipt}: PrintReceiptProps) => {
        const formContext = useContext(FormContext);
        const receipt = historyReceipt || formContext!.receipt;
        const readableDate = formatDate(receipt.date, receipt.timestamp);

    return (
        <section className="print-receipt">
            <p>Orden de pedido</p>

            { receipt.timestamp && <p>{readableDate}</p> }

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
                                            <p>{l.spout ? l.spout === 'eco' ? 'Anterior' : 'Laboratorio' : ''}</p>
                                            {
                                                l.colors.map((c) => {
                                                    return (
                                                        <div className="indent" key={c.name}>
                                                            <p>{c.quantity} {c.name}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                            {
                                                l.lazo ? 
                                                l.lazo.map((lazo) => {
                                                    return (
                                                        <div className="indent" key={lazo.name}>
                                                            <p>Lazos:</p>
                                                            <p>{lazo.quantity} {lazo.name}</p>
                                                        </div>
                                                    )
                                                }) : ''
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
                } else if (p.type === 'containerOnly') {
                    return (
                        <div key={p.id}>
                            <p><b>{p.quantity}</b> {p.name}</p>
                            <p className="price">$ {p.price}</p>
                        </div>
                    )
                } else if (p.type === 'misc') {
                    return (
                        <div key={p.id}>
                            <p><b>{p.quantity}</b> {p.name}</p>
                            <p className="price">$ {p.price}</p>
                        </div>
                    )
                } else {
                    return <p key={p.id}>ocurrió un error</p>
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