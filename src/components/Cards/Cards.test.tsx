import { render, screen } from '@testing-library/react';

import Cards from './Cards';

import { characters } from './characters.example';
import { CharacterInterface } from '../../interfaces/CharacterInterface';

const naruto: CharacterInterface | undefined = characters.find(
  (character) => character.name === 'Naruto Uzumaki'
);
const hidan: CharacterInterface | undefined = characters.find(
  (character) => character.name === 'Hidan'
);

describe('Cards', () => {
  it('Renders Naruto', () => {
    render(<Cards characters={characters} />);
    expect(screen.getByText('Naruto Uzumaki')).toBeInTheDocument();
    expect(screen.getByText(naruto?.name_kanji || '')).toBeInTheDocument();
    expect(screen.getByText(`🩵 ${naruto?.favorites}`)).toBeInTheDocument();
  });

  it('Renders Hidan', () => {
    render(<Cards characters={characters} />);
    expect(screen.getByText('Hidan')).toBeInTheDocument();
    expect(screen.getByText(hidan?.name_kanji || '')).toBeInTheDocument();
    expect(screen.getByText(`🩵 ${hidan?.favorites}`)).toBeInTheDocument();
  });
});
