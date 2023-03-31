import { Component } from 'react';

import Card from './Card/Card';

import { CharacterInterface } from '../../interfaces/CharacterInterface';

interface CardsProps {
  characters: CharacterInterface[];
}

export class Cards extends Component<CardsProps> {
  constructor(props: CardsProps) {
    super(props);
  }

  render() {
    return (
      <div className="grid grid-auto-fill gap-8 place-items-stretch" data-testid="cards">
        {this.props.characters.map((character) => (
          <Card character={character} key={character.mal_id} />
        ))}
      </div>
    );
  }
}

export default Cards;
