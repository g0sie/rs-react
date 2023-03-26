import { Component } from 'react';

import { characters } from './characters.example';

import Card, { CardProps } from './Card/Card';

interface CardState {
  characters: CardProps[];
}

export class Cards extends Component {
  state: CardState = { characters: characters };

  render() {
    return (
      <div className="grid grid-auto-fill gap-8">
        {this.state.characters.map((character) => (
          <Card {...character} key={character.mal_id} />
        ))}
      </div>
    );
  }
}

export default Cards;
