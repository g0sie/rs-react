import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { CharacterInterface } from '../../interfaces/CharacterInterface';

interface IState {
  submittedCharacters: CharacterInterface[];
}

const initialState: IState = {
  submittedCharacters: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    submitCharacter(state, action: PayloadAction<CharacterInterface>) {
      state.submittedCharacters.push(action.payload);
    },
  },
});

export const selectSubmittedCharacters = (state: RootState) => state.forms.submittedCharacters;

export const { submitCharacter } = formsSlice.actions;

export default formsSlice.reducer;
