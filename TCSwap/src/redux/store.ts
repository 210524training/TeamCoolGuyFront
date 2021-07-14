import { AnyAction } from 'redux';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import collectionReducer from './slices/collection.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    collection: collectionReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;