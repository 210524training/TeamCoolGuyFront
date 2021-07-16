import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionSheetIOS } from "react-native";
import { getCardCollection } from "../../remote/Backend.api";
import { RootState } from "../store";

export type CollectionState = string[];

//async thunk to get a collection for a specific user
//Accepts the user's name as a param
export const getCollectionAsync = createAsyncThunk<CollectionState, string>(
    'collection/getCollection/async',
    async (userName, thunkAPI) => {
        try {
            const response = await getCardCollection(userName);
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
        //Function to get the current collection state
        getCollection: (state: CollectionState, action: PayloadAction<CollectionState>) => {
            return action.payload;
        },
        //Function to add a card to a users collection
        //Accepts a string that is the cards identifier string
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