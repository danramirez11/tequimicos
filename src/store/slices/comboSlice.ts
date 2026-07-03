import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Combination, Container, Lid } from "../../types/firebase";
import { supabase } from "../../services/firebaseConfig";

type SupabaseCombinationRow = {
    id: string;
    lidId: string;
    contId: string;
    prices: Combination["prices"];
}

const mapSupabaseDataToCombinations = (
    containers: Container[],
    lids: Lid[],
    combinations: SupabaseCombinationRow[]
): Combination[] => {
    const lidById = new Map(lids.map((lid) => [lid.id, lid]));

    const lidsByContainerId = new Map<string, Combination["lids"]>();

    combinations.forEach((combo) => {
        const lid = lidById.get(combo.lidId);

        if (!lid) {
            return;
        }

        const currentLids = lidsByContainerId.get(combo.contId) ?? [];
        currentLids.push({
            id: lid.id,
            name: lid.name,
            prices: combo.prices,
        });
        lidsByContainerId.set(combo.contId, currentLids);
    });

    return containers.map((container) => ({
        id: container.id,
        name: container.name,
        pack: container.pack,
        prices: container.prices,
        lids: lidsByContainerId.get(container.id) ?? [],
    }));
}

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
            const [containersResult, lidsResult, combinationsResult] = await Promise.all([
                supabase.from('containers').select('*'),
                supabase.from('lids').select('*'),
                supabase.from('combinations').select('*'),
            ]);

            if (containersResult.error) {
                return rejectWithValue(containersResult.error);
            }

            if (lidsResult.error) {
                return rejectWithValue(lidsResult.error);
            }

            if (combinationsResult.error) {
                return rejectWithValue(combinationsResult.error);
            }

            return mapSupabaseDataToCombinations(
                (containersResult.data ?? []) as Container[],
                (lidsResult.data ?? []) as Lid[],
                (combinationsResult.data ?? []) as SupabaseCombinationRow[]
            );
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