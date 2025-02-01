import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { Receipt } from "../../types/products";

export interface receiptState {
    receipts: Receipt[];
    loading: boolean;
    error: unknown | null;
}

const initialState: receiptState = {
    receipts: [],
    loading: false,
    error: null,
}

export const fetchReceiptsData =createAsyncThunk(
    'firebase/fetchReceiptsData',
    async (_, {rejectWithValue}) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'receipts'))
            const data: Receipt[] = []
            querySnapshot.forEach((doc) => {
                data.push({...doc.data() as Receipt})
            })
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const receiptSlice = createSlice({
    name: "receipt",
    initialState,
    reducers: {
        updateReceipts: (state, action) => {
          state.receipts = action.payload
        }
      },
    extraReducers: (builder) => {
      builder
        .addCase(fetchReceiptsData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchReceiptsData.fulfilled, (state, action) => {
          state.loading = false;
          state.receipts = action.payload;
        })
        .addCase(fetchReceiptsData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});

export const { updateReceipts } = receiptSlice.actions;

export default receiptSlice.reducer;