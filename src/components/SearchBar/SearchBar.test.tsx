import { fireEvent, screen } from '@testing-library/react';
import { renderWithProvider } from '../../utils/renderWithProvider';

import { vi } from 'vitest';

import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('On first render, when local storage is empty, searches for empty string', () => {
    const mockedSearch = vi.fn();
    localStorage.removeItem('term');
    const storedTerm = localStorage.getItem('term');

    renderWithProvider(<SearchBar handleSearch={mockedSearch} />);

    expect(storedTerm).toEqual(null);
    expect(mockedSearch).toHaveBeenCalledTimes(1);
    expect(mockedSearch).toBeCalledWith('');
  });

  it('Searches on input', () => {
    const mockedSearch = vi.fn();
    renderWithProvider(<SearchBar handleSearch={mockedSearch} />);
    const searchBar = screen.getByRole('textbox');

    fireEvent.change(searchBar, { target: { value: 'naruto' } });
    fireEvent.submit(searchBar);

    expect(searchBar).toHaveValue('naruto');
    expect(mockedSearch).toBeCalledWith('naruto');
    expect(mockedSearch).toHaveBeenCalledTimes(2);
  });
});
