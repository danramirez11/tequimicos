import { configureStore } from "@reduxjs/toolkit";
import combinationReducer, { comboState } from "./slices/comboSlice"
import lidReducer, { lidState } from "./slices/lidSlice"
import clientReducer, { clientState } from "./slices/clientSlice"

export interface StoreType {
    combinations: comboState;
    lids: lidState;
    clients: clientState;
}

export const store = configureStore({
    reducer: {
        combinations: combinationReducer,
        lids: lidReducer,
        clients: clientReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

