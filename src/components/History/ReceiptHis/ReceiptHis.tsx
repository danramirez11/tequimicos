import { useState } from "react";
import { Receipt } from "../../../types/products";
import './ReceiptHis.css'
import { formatDate } from "../../../utils/functions";
import { FaPrint } from "react-icons/fa6"; 

type ReceiptHisProps = {
    receipt: Receipt;
}

const ReceiptHis = ({receipt}: ReceiptHisProps) => {
    const [ isActive, setIsActive ] = useState<boolean>(false);

    const easilyReadDate = formatDate(receipt.date);
    const productNames = receipt.products.map(p => p.name).join(', ');

    return (
        <section className={`receipt-his ${isActive ? 'active' : ''}`} onClick={() => setIsActive(!isActive)}>
            <h4>{receipt.client}</h4>
            
            {
                isActive ?

                <div>hold on</div> :

                <div className="receipt-his-info flex">
                    <p className="receipt-his-products">
                        { productNames }
                    </p>
                    <p>{easilyReadDate}, {receipt.hour}</p>
                    <p>{receipt.isDelivery ? 'Domicilio' : 'Punto de venta'}</p>
                    <p><b>${receipt.total}</b></p>
                    <button className="blue"><FaPrint/></button>
                </div>
            }
        </section>
    )
}

export default ReceiptHis;