import { useState } from 'react';
import { useBoolean } from 'usehooks-ts';

import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';

import { CharacterInterface } from '../../interfaces/CharacterInterface';

import axios from '../../api/axios';
import Loader from '../../ui/Loader/Loader';

const Home = () => {
  const [characters, setCharacters] = useState<CharacterInterface[]>([]);
  const isLoading = useBoolean(true);

  const searchCharacters = async (term: string) => {
    isLoading.setTrue();
    const response = await axios.get('characters', { params: { q: term } });
    const data = JSON.parse(await response.data);
    const characters = data.data;
    setCharacters(characters);
    isLoading.setFalse();
  };

  return (
    <main className="page flex flex-col gap-10 items-center pb-12">
      <SearchBar handleSearch={searchCharacters} />
      {isLoading.value ? <Loader /> : <Cards characters={characters} />}
    </main>
  );
};

export default Home;
