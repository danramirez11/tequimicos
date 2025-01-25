import Form from "../../components/Form/Form";
import PrintReceipt from "../../components/PrintReceipt/PrintReceipt";
import { FormProvider } from "../../context/formContext";

const SellingPage = () => {
    return (
        <FormProvider>
        <section className="page selling-page">
        <h1>Pedidos</h1>
        <Form/>
        <PrintReceipt/>
        </section>
        </FormProvider>
    )
}

export default SellingPage;