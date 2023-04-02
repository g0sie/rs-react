import Card from './Card/Card';

import { CharacterInterface } from '../../interfaces/CharacterInterface';

interface CardsProps {
  characters: CharacterInterface[];
}

const Cards = (props: CardsProps) => {
  return (
    <div className="grid grid-auto-fill gap-8 place-items-stretch" data-testid="cards">
      {props.characters.map((character) => (
        <Card character={character} key={character.mal_id} />
      ))}
    </div>
  );
};

export default Cards;
