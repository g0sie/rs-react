import { useContext } from 'react';
import ModalContext from '../../../context/ModalContext';

import HeartIcon from '../../../ui/HeartIcon';

import { CharacterInterface } from '../../../interfaces/CharacterInterface';

interface CardProps {
  character: CharacterInterface;
}

const Card = (props: CardProps) => {
  const modal = useContext(ModalContext);

  return (
    <div
      onClick={() => modal.open(props.character)}
      className="p-4 bg-slate-800 rounded-xl shadow-xl shadow-cyan-800/10 hover:shadow-cyan-300/10 hover:cursor-pointer"
    >
      <img src={props.character.images.webp.image_url} />
      <section className="flex flex-col items-center pt-3 text-center">
        <h2 className="text-slate-200 text-2xl">{props.character.name}</h2>
        <p className="text-slate-400 text-base">{props.character.name_kanji}</p>
        <p className="text-cyan-300 text-lg flex gap-x-1.5">
          <HeartIcon width="1.2rem" /> <span className="pt-0.5">{props.character.favorites}</span>
        </p>
      </section>
    </div>
  );
};

export default Card;
