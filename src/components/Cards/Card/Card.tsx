import { Component } from 'react';

import { CharacterInterface } from '../CharacterInterface';

interface CardProps {
  character: CharacterInterface;
}

export class Card extends Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }

  render() {
    return (
      <article className="p-5 bg-slate-800 rounded-xl shadow-xl shadow-cyan-800/10 hover:shadow-cyan-300/10">
        <img src={this.props.character.images.webp.image_url} />
        <section
          className="flex flex-col items-center
        justify-center pt-5"
        >
          <h2 className="text-slate-200 text-2xl">{this.props.character.name}</h2>
          <p className="text-slate-400 text-md">{this.props.character.name_kanji}</p>
          <p className="text-cyan-300 text-lg">🩵 {this.props.character.favorites}</p>
        </section>
      </article>
    );
  }
}

export default Card;
