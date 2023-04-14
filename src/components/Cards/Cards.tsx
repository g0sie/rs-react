import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import Card from './Card/Card';
import Modal from '../Modal/Modal';

import ModalContext from '../../context/ModalContext';

import { CharacterInterface } from '../../interfaces/CharacterInterface';

interface CardsProps {
  characters: CharacterInterface[];
}

const Cards = (props: CardsProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalCharacter, setModalCharacter] = useState<CharacterInterface | null>(null);

  const openModal = (character: CharacterInterface) => {
    setModalCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalCharacter(null);
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        open: openModal,
        close: closeModal,
        character: modalCharacter,
      }}
    >
      <div className="grid grid-auto-fill gap-8 place-items-stretch" data-testid="cards">
        {props.characters.map((character) => (
          <Card character={character} key={character.mal_id} />
        ))}
      </div>
      <AnimatePresence initial={false} mode="wait">
        {isModalOpen && <Modal />}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

export default Cards;
