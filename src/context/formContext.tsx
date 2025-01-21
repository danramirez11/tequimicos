/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode } from "react";
import { Receipt } from "../types/products";
import useForm from "../hooks/useForm";

interface formContextProps {
    receipt: Receipt;
    containerFun: any;
    handleMiscChange: (name: string, value: string) => void;
    handleIsDelivery: () => void;
    handleFinish: () => void;
    handleAddProduct: (type: 'container' | 'lid' | 'chemical') => void;
}

export const FormContext = createContext<formContextProps | undefined>(undefined);

export const FormProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const {
        receipt,
        containerFun,
        handleMiscChange,
        handleIsDelivery,
        handleFinish,
        handleAddProduct,
    } = useForm();

    return (
        <FormContext.Provider value={{
            receipt,
            containerFun,
            handleMiscChange,
            handleIsDelivery,
            handleFinish,
            handleAddProduct,
        }}>
            {children}
        </FormContext.Provider>
    );
};
