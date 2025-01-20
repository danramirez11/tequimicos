import { createContext, ReactNode } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface formContextProps {
    receipt: any;
}

export const FormContext = createContext<formContextProps | undefined>(undefined);

export const FormProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const receipt = {
        products: [],
        total: 0,
    };

    return (
        <FormContext.Provider value={{receipt}}>
            {children}
        </FormContext.Provider>
    );
};
