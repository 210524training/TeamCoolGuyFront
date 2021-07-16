import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/user";
import { sendLogin } from "../../remote/Backend.api";
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
  async ({username, password}, thunkAPI) => {

    try {
      const response = await sendLogin(username, password);

      return response;
    } catch(error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutAsync = createAsyncThunk<User|null>(
  'user/logout/async',
  async (thunkAPI) => {

    try {
      
      return null;
    } catch(error) {
      return null;//.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: null as UserState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    logout: (state) => {
      return null;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginAsync.pending, (state) => {
      // return null;
    })
    .addCase(loginAsync.fulfilled, (state, action) => {
      return action.payload;
    })
    .addCase(loginAsync.rejected, (state, action) => {
      console.log(action.error);
    })
    .addCase(logoutAsync.pending, (state) => {
      // return null;
    })
    .addCase(logoutAsync.fulfilled, (state, action) => {
      return action.payload;
    })
    .addCase(logoutAsync.rejected, (state, action) => {
      console.log(action.error);
    });
  },
});
export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;