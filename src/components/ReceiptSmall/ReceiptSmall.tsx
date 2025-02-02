import { useContext } from 'react';
import { Receipt } from '../../types/products'
import './ReceiptSmall.css'
import { FormContext } from '../../context/formContext';


const ReceiptSmall = () => {
    const formContext = useContext(FormContext);
    const { activeReceipt, allReceipts, receiptFun } = formContext!;


    return (
        <>
        <section className='receipts-small'>
        <button className="blue" onClick={() => receiptFun.addReceipt()}>+ Añadir Pedido</button>

        {
            allReceipts.map((r: Receipt) => {

                const productNames = r.products.map(p => p.name).join(', ');

                return (
                    <div key={r.id} className={`small-receipt ${ r.id === activeReceipt ? 'active-receipt' : ''}`} onClick={() => receiptFun.changeActiveReceipt(r.id)}>
                        <h5>{r.client}</h5>
                        <p className='product-name'>{productNames}</p>
                        <p><b>{r.isDelivery ? 'Domicilio' : 'Punto de venta'} - $ {r.total}</b></p>
                    </div>
                )
            })
        }
        </section>
        </>
    )
}

export default ReceiptSmall;