import { createContext, ReactNode } from "react";
import { Receipt, ReceiptChemical, ReceiptContainer, ReceiptLid } from "../types/products";
import useForm from "../hooks/useForm";

interface formContextProps {
    receipt: Receipt;
    handleProductChange: (product: ReceiptContainer | ReceiptLid | ReceiptChemical) => void;
    handleMiscChange: (key: string, value: string) => void;
    handleAddContainer: () => void;
    handleAddLid: () => void;
    handleAddChemical: () => void;
    handleIsDelivery: () => void;
    handleFinish: () => void;
}

export const FormContext = createContext<formContextProps | undefined>(undefined);

export const FormProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const {
        receipt,
        handleProductChange,
        handleMiscChange,
        handleAddContainer,
        handleAddLid,
        handleAddChemical,
        handleIsDelivery,
        handleFinish
    } = useForm();

    return (
        <FormContext.Provider value={{
            receipt,
            handleProductChange,
            handleMiscChange,
            handleAddContainer,
            handleAddLid,
            handleAddChemical,
            handleIsDelivery,
            handleFinish
        }}>
            {children}
        </FormContext.Provider>
    );
};
