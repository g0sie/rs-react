import { Component } from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';

import { CharacterInterface } from '../../interfaces/CharacterInterface';
import { characters } from '../../components/Cards/characters.example';

interface CardState {
  characters: CharacterInterface[];
}

class Home extends Component {
  state: CardState = { characters: characters };

  termMatchesCharacter(term: string, character: CharacterInterface): boolean {
    return character.name.toLowerCase().includes(term.toLowerCase());
  }

  filterCharacters(term: string): void {
    const filtered = characters.filter((character) => this.termMatchesCharacter(term, character));
    this.setState({ characters: filtered });
  }

  render() {
    return (
      <main className="page flex flex-col gap-10 items-center pb-12">
        <SearchBar onSearch={this.filterCharacters.bind(this)} />
        <Cards characters={this.state.characters} />
      </main>
    );
  }
}

export default Home;
