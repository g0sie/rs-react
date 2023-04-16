import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectSearchedTerm } from '../../pages/Home/searchSlice';
import { setTerm as setStoredTerm } from '../../pages/Home/searchSlice';

const SearchBar = () => {
  const storedTerm = useSelector(selectSearchedTerm);
  const term = useRef<string>(storedTerm);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    term.current = newTerm;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    dispatch(setStoredTerm(term.current));
    e.preventDefault();
  };

  const saveTermOnUnmount = () => {
    return () => {
      dispatch(setStoredTerm(term.current));
    };
  };
  useEffect(saveTermOnUnmount, []);

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
        defaultValue={storedTerm}
        placeholder="Search for anime character..."
      />
      <button className="px-3 h-12 bg-slate-200 rounded-r-3xl" type="submit">
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
