import { rest } from 'msw';

import { searchCharacterResponse } from './searchCharacterResponse';

export const handlers = [
  rest.get('https://api.jikan.moe/v4/characters', (req, res, ctx) => {
    let characters;
    if (req.url.searchParams.get('q') === 'kakashi') {
      characters = searchCharacterResponse;
    } else characters = {};

    return res(ctx.status(200), ctx.json(characters), ctx.delay(30));
  }),
];
