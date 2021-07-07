import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/user";
//import { sendLogin } from "../../remote/grubdash-backend/grubdash.api";
import { RootState } from "../store";
//import { AxiosError } from 'axios';


export type UserState = User | null;

const examplePlayer: User ={
    username: 'best_player',
    password: 'root',
    firstname: 'John',
    lastname: 'Doe',
    role: 'player'
}

const exampleStoreOwner: User ={
    username: 'best_owner',
    password: 'root',
    firstname: 'Peter',
    lastname: 'Smith',
    role: 'store owner'
}

export type LoginCredentials = {
  username: string;
  password: string;
}

/*export function isAxiosError(error: any): error is AxiosError {
  return "isAxiosError" in error;
}*/

export const loginAsync = createAsyncThunk<User, LoginCredentials>(
  'user/login/async',
  async ({username, password}: any, thunkAPI: { rejectWithValue: (arg0: any) => any; }) => {

    try {
      // const response = await sendLogin(username, password);
      if(username === exampleStoreOwner.username && password === exampleStoreOwner.password) return exampleStoreOwner;
      if(username === examplePlayer.username && password === examplePlayer.password) return examplePlayer;
      return null;
    } catch(error) {
      // console.log(`error is an AxiosError: ${isAxiosError(error)}`);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: null as UserState,
  reducers: {
    login: (state: UserState, action: PayloadAction<User>) => {
      return action.payload;
    },
    logout: (state: UserState) => {
      return null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state: UserState) => {
        // return null;
      })
      .addCase(loginAsync.fulfilled, (state: UserState, action) => {
        return action.payload;
      })
      .addCase(loginAsync.rejected, (state: UserState, action) => {
        console.log(action.error);
      });
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;