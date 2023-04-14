import { createContext } from 'react';
import { CharacterInterface } from '../interfaces/CharacterInterface';

interface ModalContextType {
  open: (character: CharacterInterface) => void;
  close: () => void;
  character: CharacterInterface | null;
}

const ModalContext = createContext<ModalContextType>({
  open: (character: CharacterInterface) => {},
  close: () => {},
  character: null,
});

export default ModalContext;
