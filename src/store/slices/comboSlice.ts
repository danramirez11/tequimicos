import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { Combination } from "../../types/firebase";
import { db } from "../../services/firebaseConfig";

export interface comboState {
    combinations: Combination[];
    loading: boolean;
    error: unknown | null;
}

const initialState: comboState = {
    combinations: [],
    loading: false,
    error: null,
}

export const fetchComboData =createAsyncThunk(
    'firebase/fecthComboData',
    async (_, {rejectWithValue}) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'combinations'))
            const data: Combination[] = []
            querySnapshot.forEach((doc) => {
                data.push({id: doc.id, ...(doc.data() as Omit<Combination, 'id'>) })
            })
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const combinationSlice = createSlice({
    name: "combination",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchComboData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchComboData.fulfilled, (state, action) => {
          state.loading = false;
          state.combinations = action.payload;
        })
        .addCase(fetchComboData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default combinationSlice.reducer;