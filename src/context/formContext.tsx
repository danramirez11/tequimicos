import { createContext, ReactNode } from "react";
import { Receipt } from "../types/products";
import useForm from "../hooks/useForm";

interface formContextProps {
    receipt: Receipt;
    handleProductChange: (id: string, key: string, value:string) => void;
    handleMiscChange: (key: string, value: string) => void;
    handleAddContainer: () => void;
    handleAddLid: () => void;
    handleAddChemical: () => void;
    handleIsDelivery: () => void;
    handleFinish: () => void;
    handleContainerLidChange: (containerId: string, lidId: string, key: string, value: string) => void;
    handleConLidColorChange: (containerId: string, lidId: string, color: string, key: string, value: string) => void;
    addColorToLid: (containerId: string, lidId: string) => void;
    addLidToContainer: (containerId: string) => void;
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
        handleFinish,
        handleContainerLidChange,
        handleConLidColorChange,
        addColorToLid,
        addLidToContainer
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
            handleFinish,
            handleContainerLidChange,
            handleConLidColorChange,
            addColorToLid,
            addLidToContainer
        }}>
            {children}
        </FormContext.Provider>
    );
};
