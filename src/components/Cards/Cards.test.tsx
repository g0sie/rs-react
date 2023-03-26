import { render, screen } from '@testing-library/react';

import Cards from './Cards';
import { CardProps } from './Card/Card';

import { characters } from './characters.example';

const naruto: CardProps = characters.filter((character) => character.name === 'Naruto Uzumaki')[0];
const hidan: CardProps = characters.filter((character) => character.name === 'Hidan')[0];

describe('Cards', () => {
  it('Renders Naruto', () => {
    render(<Cards />);
    expect(screen.getByText(naruto.name)).toBeInTheDocument();
    expect(screen.getByText(naruto.name_kanji || '')).toBeInTheDocument();
    expect(screen.getByText(`🩵 ${naruto.favorites}`)).toBeInTheDocument();
  });

  it('Renders Hidan', () => {
    render(<Cards />);
    expect(screen.getByText(hidan.name)).toBeInTheDocument();
    expect(screen.getByText(hidan.name_kanji || '')).toBeInTheDocument();
    expect(screen.getByText(`🩵 ${hidan.favorites}`)).toBeInTheDocument();
  });
});
