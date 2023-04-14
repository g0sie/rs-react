import { useState } from 'react';
import { useBoolean } from 'usehooks-ts';

import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';

import { CharacterInterface } from '../../interfaces/CharacterInterface';
import { characters as loadingCharacters } from '../../components/Cards/characters.example';

import axios from '../../api/axios';

const Home = () => {
  const [characters, setCharacters] = useState<CharacterInterface[]>([]);
  const loading = useBoolean(true);

  const searchCharacters = async (term: string) => {
    loading.setTrue();
    const response = await axios.get('characters', { params: { q: term } });
    const data = JSON.parse(await response.data);
    const characters = data.data;
    setCharacters(characters);
    loading.setFalse();
  };

  return (
    <main className="page flex flex-col gap-10 items-center pb-12">
      <SearchBar handleSearch={searchCharacters} />
      <Cards
        isLoading={loading.value}
        characters={loading.value ? loadingCharacters : characters}
      />
    </main>
  );
};

export default Home;
