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
    handleAddProduct: (type: 'container' | 'lid' | 'chemical' | 'containerOnly' | 'misc') => void;
    finishErrors: string[];
    lidFun: any;
    handleDeleteProduct: (id: string) => void;
    clientFun: any;
    clientErrors: string;
    miscFun: any;
    containerOnlyFun: any;
    allReceipts: Receipt[];
    activeReceipt: string | null;
    receiptFun: any;
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
        finishErrors,
        lidFun,
        handleDeleteProduct,
        clientFun,
        clientErrors,
        miscFun,
        containerOnlyFun,
        allReceipts,
        activeReceipt,
        receiptFun
    } = useForm();

    return (
        <FormContext.Provider value={{
            receipt,
            containerFun,
            handleMiscChange,
            handleIsDelivery,
            handleFinish,
            handleAddProduct,
            finishErrors,
            lidFun,
            handleDeleteProduct,
            clientFun,
            clientErrors,
            miscFun,
            containerOnlyFun,
            allReceipts,
            activeReceipt,
            receiptFun
        }}>
            {children}
        </FormContext.Provider>
    );
};
