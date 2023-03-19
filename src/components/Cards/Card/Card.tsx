import { Component } from 'react';

interface CardProps {
  mal_id: number;
  url: string;
  images: { jpg: { image_url: string }; webp: { image_url: string; small_image_url: string } };
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string;
}

export class Card extends Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }

  render() {
    return (
      <article className="p-5 bg-slate-800 rounded-xl shadow-xl shadow-cyan-300/10">
        <img src={this.props.images.webp.image_url} />
        <section
          className="flex flex-col items-center
        justify-center pt-5"
        >
          <h2 className="text-slate-200 text-2xl">{this.props.name}</h2>
          <p className="text-slate-400 text-md">{this.props.name_kanji}</p>
          <p className="text-cyan-300 text-lg">🩵 {this.props.favorites}</p>
        </section>
      </article>
    );
  }
}

export default Card;
