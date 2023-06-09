export interface CharacterInterface {
  mal_id: number;
  url: string;
  images: { jpg: { image_url: string }; webp: { image_url: string; small_image_url: string } };
  name: string;
  name_kanji: string | null;
  nicknames: string[];
  favorites: number;
  about: string | null;
}
