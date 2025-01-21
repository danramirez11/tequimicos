import { configureStore } from "@reduxjs/toolkit";
import combinationReducer, { comboState } from "./slices/comboSlice"
import lidReducer, { lidState } from "./slices/lidSlice"

export interface StoreType {
    combinations: comboState;
    lids: lidState;
}

export const store = configureStore({
    reducer: {
        combinations: combinationReducer,
        lids: lidReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

