import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';
import Modal from '../../components/Modal/Modal';

import ModalContext from '../../context/ModalContext';

import { CharacterInterface } from '../../interfaces/CharacterInterface';
import { characters as initialCharacters } from '../../components/Cards/characters.example';

import axios from '../../api/axios';

const Home = () => {
  const [characters, setCharacters] = useState<CharacterInterface[]>(initialCharacters);

  const searchCharacters = async (term: string) => {
    const response = await axios.get('characters', { params: { q: term } });
    const data = JSON.parse(await response.data);
    const characters = data.data;
    setCharacters(characters);
  };

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
    <main className="page flex flex-col gap-10 items-center pb-12">
      <SearchBar onSearch={searchCharacters} />
      <ModalContext.Provider
        value={{
          isOpen: isModalOpen,
          open: openModal,
          close: closeModal,
          character: modalCharacter,
        }}
      >
        <Cards characters={characters} />
        <AnimatePresence initial={false} mode="wait">
          {isModalOpen && <Modal />}
        </AnimatePresence>
      </ModalContext.Provider>
    </main>
  );
};

export default Home;
