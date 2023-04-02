import { useState } from 'react';

import { CharacterInterface } from '../../../interfaces/CharacterInterface';

import './Card.css';

interface CardProps {
  character: CharacterInterface;
}

const Card = (props: CardProps) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  function flipCard(): void {
    setFlipped(!flipped);
  }

  return (
    <div onClick={flipCard} className="flip-card" data-testid="card">
      <div
        className={[
          'flip-card-inner',
          flipped ? 'rotate-y-180' : '',
          'p-4 bg-slate-800 rounded-xl shadow-xl shadow-cyan-800/10 hover:shadow-cyan-300/10',
        ].join(' ')}
      >
        <div className="flip-card-front">
          <img src={props.character.images.webp.image_url} />
          <section className="flex flex-col items-center pt-3">
            <h2 className="text-slate-200 text-2xl">{props.character.name}</h2>
            <p className="text-slate-400 text-base">{props.character.name_kanji}</p>
            <p className="text-cyan-300 text-lg">🩵 {props.character.favorites}</p>
          </section>
        </div>
        <div className="flip-card-back w-full py-4 pl-4 pr-2">
          <div className="content overflow-y-auto h-full pr-2">
            {props.character.about?.split('\n').map((p, indx) => (
              <p
                className="text-slate-400 pb-1 text-base"
                key={`c-${props.character.mal_id}-p-${indx}`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
