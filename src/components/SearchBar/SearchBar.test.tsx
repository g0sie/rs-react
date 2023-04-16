import { fireEvent, screen } from '@testing-library/react';
import { renderWithProvider } from '../../utils/renderWithProvider';

import { vi } from 'vitest';

import SearchBar from './SearchBar';

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
});
