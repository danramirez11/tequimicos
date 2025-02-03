import Form from "../../components/Form/Form";
import PrintReceipt from "../../components/PrintReceipt/PrintReceipt";
import './SellingPage.css';
import ReceiptSmall from "../../components/ReceiptSmall/ReceiptSmall";

const SellingPage = () => {

    return (
        <section className="page selling-page">
        <h1>Pedidos</h1>
        <div className="flex">
            <Form/>
            <section className="selling-receipts-thumbnail">
                <ReceiptSmall/>
            </section>
        </div>
        <PrintReceipt/>
        </section>
    )
}

export default SellingPage;