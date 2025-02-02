import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { Lid } from "../../types/firebase";
import { db } from "../../services/firebaseConfig";

export interface lidState {
    lids: Lid[];
    loading: boolean;
    error: unknown | null;
}

const initialState: lidState = {
    lids: [],
    loading: false,
    error: null,
}

export const fetchLidData =createAsyncThunk(
    'firebase/fetcLidData',
    async (_, {rejectWithValue}) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'lids'))
            const data: Lid[] = []
            querySnapshot.forEach((doc) => {
                data.push({id: doc.id, ...(doc.data() as Omit<Lid, 'id'>) })
            })
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const lidSlice = createSlice({
    name: "lid",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchLidData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchLidData.fulfilled, (state, action) => {
          state.loading = false;
          state.lids = action.payload;
        })
        .addCase(fetchLidData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default lidSlice.reducer;