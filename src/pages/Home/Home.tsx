import { useEffect, useState } from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';

import { CharacterInterface } from '../../interfaces/CharacterInterface';

import Loader from '../../ui/Loader/Loader';
import { useLazySearchCharactersQuery } from '../../api/apiSlice';

const Home = () => {
  const [trigger, { data, isFetching }] = useLazySearchCharactersQuery();
  const [characters, setCharacters] = useState<CharacterInterface[]>([]);

  useEffect(() => {
    if (data) setCharacters(data.data);
  }, [data]);

  return (
    <main className="page flex flex-col gap-10 items-center pb-12">
      <SearchBar handleSearch={trigger} />
      {isFetching ? <Loader /> : <Cards characters={characters} />}
    </main>
  );
};

export default Home;
