import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

import 'whatwg-fetch';

import { server } from './api/mocks/server';
import { apiSlice } from './api/apiSlice';
import { setupStore } from './store';

expect.extend(matchers);

const store = setupStore();

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(apiSlice.util.resetApiState());
});

afterAll(() => server.close());
