import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './pages/Home/searchSlice';

export const store = configureStore({ reducer: { search: searchReducer } });

export type RootState = ReturnType<typeof store.getState>;
