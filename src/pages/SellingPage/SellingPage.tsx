import Form from "../../components/Form/Form";
import { FormProvider } from "../../context/formContext";

const SellingPage = () => {
    return (
        <FormProvider>
        <h1>Facturación</h1>
        <Form/>
        </FormProvider>
    )
}

export default SellingPage;