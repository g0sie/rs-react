import { createContext } from 'react';
import { CharacterInterface } from '../interfaces/CharacterInterface';

interface ModalContextType {
  isOpen: boolean;
  open: (character: CharacterInterface) => void;
  close: () => void;
  character: CharacterInterface | null;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  open: (character: CharacterInterface) => {},
  close: () => {},
  character: null,
});

export default ModalContext;
