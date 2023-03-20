import { Component } from 'react';

import Card from './Card/Card';

import { CharacterInterface } from './CharacterInterface';

interface CardsProps {
  characters: CharacterInterface[];
}

export class Cards extends Component<CardsProps> {
  constructor(props: CardsProps) {
    super(props);
  }

  render() {
    return (
      <div className="grid grid-auto-fill gap-8">
        {this.props.characters.map((character) => (
          <Card character={character} key={character.mal_id} />
        ))}
      </div>
    );
  }
}

export default Cards;
