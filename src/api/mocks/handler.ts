import { rest } from 'msw';

import { searchCharacterResponse } from './searchCharacterResponse';

export const handlers = [
  rest.get('https://api.jikan.moe/v4/characters?q=kakashi', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(searchCharacterResponse), ctx.delay(30));
  }),
];
