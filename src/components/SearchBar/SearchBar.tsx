import { ChangeEvent, FormEvent } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectSearchedTerm } from '../../pages/Home/searchSlice';
import { setTerm } from '../../pages/Home/searchSlice';

import useMountEffect from '../../hooks/useMountEffect';

interface SearchBarProps {
  handleSearch: (term: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const dispatch = useDispatch();
  const term = useSelector(selectSearchedTerm);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    dispatch(setTerm(newTerm));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.handleSearch(term);
  };

  useMountEffect(() => {
    props.handleSearch(term);
  });

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={[
        'xl:w-1/3 lg:w-1/2 md:w-2/3 w-3/4',
        'flex items-center justify-between',
        'rounded-3xl shadow-lg shadow-cyan-800',
      ].join(' ')}
    >
      <input
        className="inline-block h-12 w-full px-7 rounded-l-3xl bg-slate-200 text-slate-900 placeholder:text-slate-500 text-lg"
        onChange={(e) => handleChange(e)}
        value={term}
        placeholder="Search for anime character..."
      />
      <button className="px-3 h-12 bg-slate-200 rounded-r-3xl" type="submit">
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
