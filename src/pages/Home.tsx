import { Component } from 'react';

import SearchBar from '../components/SearchBar/SearchBar';
import Cards from '../components/Cards/Cards';

import { CharacterInterface } from '../components/Cards/CharacterInterface';
import { characters } from '../components/Cards/characters.example';

interface CardState {
  characters: CharacterInterface[];
}

class Home extends Component {
  state: CardState = { characters: characters };

  render() {
    return (
      <main className="page flex flex-col gap-10 items-center pt-10 pb-12">
        <SearchBar />
        <Cards characters={this.state.characters} />
      </main>
    );
  }
}

export default Home;
