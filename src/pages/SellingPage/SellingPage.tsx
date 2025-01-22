import Form from "../../components/Form/Form";
import { FormProvider } from "../../context/formContext";

const SellingPage = () => {
    return (
        <FormProvider>
        <section className="page selling-page">
        <h1>Pedidos</h1>
        <Form/>
        </section>
        </FormProvider>
    )
}

export default SellingPage;