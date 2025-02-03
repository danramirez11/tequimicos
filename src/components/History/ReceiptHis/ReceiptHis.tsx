import { Receipt } from "../../../types/products";
import './ReceiptHis.css'

type ReceiptHisProps = {
    receipt: Receipt;
}

const ReceiptHis = ({receipt}: ReceiptHisProps) => {
    return (
        <div className="receipt-his">
            <h3>{receipt.client}</h3>
            <p>{receipt.date}</p>
            <p>{receipt.hour}</p>
            <p>{receipt.total}</p>
        </div>
    )
}

export default ReceiptHis;