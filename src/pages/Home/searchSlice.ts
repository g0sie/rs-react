import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState = {
  term: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setTerm(state, action) {
      state.term = action.payload;
    },
  },
});

export const selectSearchedTerm = (state: RootState) => state.search.term;

export const { setTerm } = searchSlice.actions;

export default searchSlice.reducer;
