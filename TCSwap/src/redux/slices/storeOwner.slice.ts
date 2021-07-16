import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCardCollection } from "../../remote/Backend.api";
import { RootState } from "../store";

export type InventoryState = string[];

export const getInventoryAsync = createAsyncThunk<InventoryState, unknown>(
  'inventory/getCollection/async',
  async (empty, thunkAPI) => {
    try {
      const data = await getCardCollection('bob99');
      return data;
    }
    catch(error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState: [] as InventoryState,
  reducers: {
    getInventory: (state: InventoryState, action: PayloadAction<InventoryState>) => {
      return action.payload
    },
  }
})