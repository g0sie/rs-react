import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectSearchedTerm } from './searchSlice';

import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';

import { CharacterInterface } from '../../interfaces/CharacterInterface';

import Loader from '../../ui/Loader/Loader';
import { useSearchCharactersQuery } from '../../api/apiSlice';

const Home = () => {
  const term = useSelector(selectSearchedTerm);
  const { data, isLoading } = useSearchCharactersQuery(term);

  const [characters, setCharacters] = useState<CharacterInterface[]>([]);

  useEffect(() => {
    if (data) setCharacters(data.data);
  }, [data]);

  return (
    <main className="page flex flex-col gap-10 items-center pb-12">
      <SearchBar />
      {isLoading ? <Loader /> : <Cards characters={characters} />}
    </main>
  );
};

export default Home;
