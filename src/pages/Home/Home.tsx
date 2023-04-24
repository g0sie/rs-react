import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useLazySearchCharactersQuery } from '../../api/apiSlice';
import { selectSearchedCharacters } from './searchSlice';
import { setCharacters } from './searchSlice';

import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';

import Loader from '../../ui/Loader/Loader';

const Home = () => {
  const [triggerSearch, { data, isFetching }] = useLazySearchCharactersQuery();
  const characters = useSelector(selectSearchedCharacters);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) dispatch(setCharacters(data.data));
  }, [data, dispatch]);

  return (
    <main className="page flex flex-col gap-10 items-center pb-12">
      <SearchBar handleSearch={triggerSearch} searchOnMount={characters.length === 0} />
      {isFetching ? <Loader /> : <Cards characters={characters} />}
    </main>
  );
};

export default Home;
