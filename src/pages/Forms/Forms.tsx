import { Component } from 'react';

import CreateCardForm from '../../components/CreateCardForm/CreateCardForm';
import Cards from '../../components/Cards/Cards';

import { CharacterInterface } from '../../interfaces/CharacterInterface';

interface FormsState {
  characters: CharacterInterface[];
}
class Forms extends Component {
  state: FormsState = { characters: [] };

  addCharacter(newCharacter: CharacterInterface): void {
    const characters = [...this.state.characters, newCharacter];
    this.setState({ characters: characters });
  }

  render() {
    return (
      <main className="page flex flex-col items-center gap-10 text-4xl text-slate-200">
        <h1 className="w-11/12 text-center">Create an anime character</h1>
        <CreateCardForm
          onSubmit={(character: CharacterInterface) => this.addCharacter(character)}
        />
        <Cards characters={this.state.characters} />
      </main>
    );
  }
}

export default Forms;
