import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { Client } from "../../types/firebase";
import { db } from "../../services/firebaseConfig";

export interface clientState {
    clients: Client[];
    loading: boolean;
    error: unknown | null;
}

const initialState: clientState = {
    clients: [],
    loading: false,
    error: null,
}

export const fetchClientData = createAsyncThunk(
    'firebase/fetchClientData',
    async (_, {rejectWithValue}) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'clients'))
            const data: Client[] = []
            querySnapshot.forEach((doc) => {
                data.push({id: doc.id, ...(doc.data() as Omit<Client, 'id'>) })
            })
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const clientSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {
      updateClients: (state, action) => {
        state.clients = action.payload
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchClientData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchClientData.fulfilled, (state, action) => {
          state.loading = false;
          state.clients = action.payload;
        })
        .addCase(fetchClientData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { updateClients } = clientSlice.actions;
  
  export default clientSlice.reducer;