import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { CharacterInterface } from '../../interfaces/CharacterInterface';

interface IState {
  term: string;
  characters: CharacterInterface[];
}

const initialState: IState = {
  term: '',
  characters: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setTerm(state, action: PayloadAction<string>) {
      state.term = action.payload;
    },
    setCharacters(state, action: PayloadAction<CharacterInterface[]>) {
      state.characters = action.payload;
    },
  },
});

export const selectSearchedTerm = (state: RootState) => state.search.term;
export const selectSearchedCharacters = (state: RootState) => state.search.characters;

export const { setTerm, setCharacters } = searchSlice.actions;

export default searchSlice.reducer;
