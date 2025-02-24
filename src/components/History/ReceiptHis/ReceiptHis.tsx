import { useState } from "react";
import { Receipt } from "../../../types/products";
import './ReceiptHis.css'
import { formatDate } from "../../../utils/functions";
import { FaPrint } from "react-icons/fa6"; 
import { FaEdit, FaTrash } from "react-icons/fa";

type ReceiptHisProps = {
    receipt: Receipt;
    onPrint: (receipt: Receipt) => void;
}

const ReceiptHis = ({receipt, onPrint}: ReceiptHisProps) => {
    const [ isActive, setIsActive ] = useState<boolean>(false);

    const easilyReadDate = formatDate(receipt.date, receipt.timestamp);
    const productNames = receipt.products.map(p => p.name).join(', ');

    return (
        <section className={`receipt-his ${isActive ? 'his-active' : ''}`} onClick={() => setIsActive(!isActive)}>
            <h4>{receipt.client}</h4>
            
            {
                isActive ?

                <div className="receipt-his-info">
                    <div className="receipt-his-products">
                        { receipt.products.map(p => {
                            if (p.type === 'container') {
                                return (
                                    <>
                                    <p key={p.id}><b>{p.quantity}</b> {p.name}</p>
                                    <div className="indent">
                                        {p.lids.map(l => {
                                            return (
                                                <>
                                                <p key={l.id}><b>{l.quantity}</b> {l.name}</p>
                                                <p>{l.spout ? l.spout === 'eco' ? 'Anterior' : 'Laboratorio' : ''}</p>
                                                <div className="indent">
                                                    {l.colors.map(c => {
                                                        return (
                                                            <p key={c.name}>{c.quantity} {c.name}</p>
                                                        )
                                                    })}
                                                </div>
                                                {l.lazo ? 
                                                    l.lazo.map(lazo => {
                                                        return (
                                                            <div className="indent" key={lazo.name}>
                                                                <p>Lazos:</p>
                                                                <p>{lazo.quantity} {lazo.name}</p>
                                                            </div>
                                                        )
                                                    }) : ''
                                                }
                                                </>
                                            )
                                        })}
                                    </div>
                                    <p className="price">${p.price}</p>
                                    </>
                                )
                            } else if (p.type === 'lid') {
                                return (
                                    <>
                                    <p key={p.id}><b>{p.quantity}</b> {p.name}</p>
                                    <div className="indent">
                                        {p.colors.map(c => {
                                            return (
                                                <p key={c.name}>{c.quantity} {c.name}</p>
                                            )
                                        })}
                                    </div>
                                    <p className="price">${p.price}</p>
                                    </>
                                )
                            } else if (p.type === 'containerOnly'){
                                return (
                                    <>
                                    <p key={p.id}><b>{p.quantity}</b> {p.name}</p>
                                    <p className="price">${p.price}</p>
                                    </>
                                )
                            } else if (p.type === 'misc'){
                                return (
                                    <>
                                    <p key={p.id}><b>{p.quantity}</b> {p.name}</p>
                                    <p className="price">${p.price}</p>
                                    </>
                                )
                            }
                        })}
                    </div>
                    <p>{easilyReadDate} <br/> {receipt.payment}</p>
                    <p>{receipt.isDelivery ? 'Domicilio' : 'Punto de venta'}</p>
                    <p><b>${receipt.total}</b></p>
                    <div className="receipt-his-buttons">
                    <button className="blue" onClick={(e) => {
                        e.stopPropagation();
                        onPrint(receipt);
                    }}><FaPrint/></button>
                    <button className="blue" disabled><FaEdit/></button>
                    <button className="red" disabled><FaTrash/></button>
                </div>
                </div> 
                
                :

                <div className="receipt-his-info">
                    <p className="receipt-his-products">
                        { productNames }
                    </p>
                    <p>{easilyReadDate}</p>
                    <p>{receipt.isDelivery ? 'Domicilio' : 'Punto de venta'}</p>
                    <p><b>${receipt.total}</b></p>
                    <button className="blue"><FaPrint onClick={(e) => {
                        e.stopPropagation();
                        onPrint(receipt);
                    }}/></button>
                </div>
            }
        </section>
    )
}

export default ReceiptHis;