import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';

import SearchBar from './SearchBar';

import { renderWithProvider } from '../../utils/renderWithProvider';
import { setupStore } from '../../store';
import { setTerm } from '../../pages/Home/searchSlice';

describe('SearchBar', () => {
  it('Searches on input', () => {
    const mockedSearch = vi.fn();
    renderWithProvider(<SearchBar handleSearch={mockedSearch} searchOnMount={false} />);
    const searchBar = screen.getByRole('textbox');

    fireEvent.change(searchBar, { target: { value: 'naruto' } });
    fireEvent.submit(searchBar);

    expect(searchBar).toHaveValue('naruto');
    expect(mockedSearch).toBeCalledWith('naruto');
    expect(mockedSearch).toHaveBeenCalledTimes(1);
  });

  describe('searchOnMount', () => {
    it('When true, searches on mount', () => {
      const mockedSearch = vi.fn();
      renderWithProvider(<SearchBar handleSearch={mockedSearch} searchOnMount={true} />);
      expect(mockedSearch).toHaveBeenCalledTimes(1);
    });
    it("When false, doesn't search on mount", () => {
      const mockedSearch = vi.fn();
      renderWithProvider(<SearchBar handleSearch={mockedSearch} searchOnMount={false} />);
      expect(mockedSearch).toHaveBeenCalledTimes(0);
    });
  });

  it('Searches for stored term', () => {
    const store = setupStore();
    store.dispatch(setTerm('kakashi'));
    const mockedSearch = vi.fn();
    renderWithProvider(<SearchBar handleSearch={mockedSearch} searchOnMount={true} />, { store });

    expect(mockedSearch).toHaveBeenCalledWith('kakashi');
    expect(mockedSearch).toHaveBeenCalledTimes(1);
  });
});
