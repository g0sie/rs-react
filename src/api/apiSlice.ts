import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (builder) => ({
    searchCharacters: builder.query({
      query: (term) => `characters?q=${term}`,
    }),
  }),
});

export const { useLazySearchCharactersQuery } = apiSlice;
