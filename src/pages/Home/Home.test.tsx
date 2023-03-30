import { render, screen, fireEvent } from '@testing-library/react';

import Home from './Home';

import { characters } from '../../components/Cards/characters.example';

describe('Home', () => {
  it('Renders all cards', () => {
    render(<Home />);

    characters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
      expect(screen.getByText(character.name_kanji || '')).toBeInTheDocument();
      expect(screen.getByText(`🩵 ${character.favorites}`)).toBeInTheDocument();
    });
  });

  describe('Search', () => {
    const setUp = () => {
      render(<Home />);
      const searchBar: HTMLInputElement = screen.getByRole('textbox');
      return { searchBar };
    };

    const search = (searchBar: HTMLInputElement, term: string) => {
      fireEvent.change(searchBar, { target: { value: term } });
      fireEvent.submit(searchBar);
    };

    it('works with term Kakashi', () => {
      const { searchBar } = setUp();

      search(searchBar, 'Kakashi');

      expect(screen.getByText('Kakashi Hatake')).toBeInTheDocument();
      expect(screen.queryByText('Naruto Uzumaki')).toBeNull();
    });

    it('is case-insensitive', () => {
      const { searchBar } = setUp();

      search(searchBar, 'kakashi');

      expect(screen.getByText('Kakashi Hatake')).toBeInTheDocument();
    });

    it('resets characters when term is empty', () => {
      const { searchBar } = setUp();

      search(searchBar, 'kakashi');
      search(searchBar, '');

      expect(screen.getByText('Naruto Uzumaki')).toBeInTheDocument();
    });
  });
});
