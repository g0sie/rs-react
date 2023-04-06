import { useState } from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';

import { CharacterInterface } from '../../interfaces/CharacterInterface';
import { characters as initialCharacters } from '../../components/Cards/characters.example';

const Home = () => {
  const [characters, setCharacters] = useState<CharacterInterface[]>(initialCharacters);

  const termMatchesCharacter = (term: string, character: CharacterInterface) => {
    return character.name.toLowerCase().includes(term.toLowerCase());
  };

  const filterCharacters = (term: string) => {
    const filtered = initialCharacters.filter((character) => termMatchesCharacter(term, character));
    setCharacters(filtered);
  };

  return (
    <main className="page flex flex-col gap-10 items-center pb-12">
      <SearchBar onSearch={filterCharacters} />
      <Cards characters={characters} />
    </main>
  );
};

export default Home;
