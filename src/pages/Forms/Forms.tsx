import { useDispatch, useSelector } from 'react-redux';
import { selectSubmittedCharacters, submitCharacter } from './formsSlice';

import CreateCardForm from '../../components/CreateCardForm/CreateCardForm';
import Cards from '../../components/Cards/Cards';

import { CharacterInterface } from '../../interfaces/CharacterInterface';

const Forms = () => {
  const characters = useSelector(selectSubmittedCharacters);
  const dispatch = useDispatch();

  const addCharacter = (character: CharacterInterface) => {
    dispatch(submitCharacter(character));
  };

  return (
    <main className="page flex flex-col items-center gap-10 text-4xl text-slate-200">
      <h1 className="w-11/12 text-center">Create an anime character</h1>
      <CreateCardForm handleSubmit={addCharacter} />
      <Cards characters={characters} />
    </main>
  );
};

export default Forms;
