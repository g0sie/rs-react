import { useState } from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';

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

  return (
    <main className="page flex flex-col gap-10 items-center pb-12">
      <SearchBar onSearch={searchCharacters} />
      <Cards characters={characters} />
    </main>
  );
};

export default Home;
