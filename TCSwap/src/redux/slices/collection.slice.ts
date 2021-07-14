import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionSheetIOS } from "react-native";
import { getCardCollection } from "../../remote/Backend.api";
import { RootState } from "../store";

export type CollectionState = string[];

export const getCollectionAsync = createAsyncThunk<CollectionState, unknown>(
    'collection/getCollection/async',
    async (empty, thunkAPI) => {
        try {
            const response = await getCardCollection();
            return response;
        }
        catch(error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const collectionSlice = createSlice({
    name: 'collection',
    initialState: [] as CollectionState,
    reducers: {
        getCollection: (state: CollectionState, action: PayloadAction<CollectionState>) => {
            return action.payload;
        },
        addCardToState: (state, action: PayloadAction<string>) => {
            const newState = state;
            newState.push(action.payload);
            return newState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCollectionAsync.pending, (state) => {
                //return nothing
            })
            .addCase(getCollectionAsync.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getCollectionAsync.rejected, (state, action) => {
                console.log(action.error);
            })
    },
});

export const { getCollection, addCardToState } = collectionSlice.actions;
export const selectCollection = (state: RootState) => state.collection;
export default collectionSlice.reducer;