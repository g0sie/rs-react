import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);

import { server } from './api/mocks/server';
import { apiSlice } from './api/apiSlice';
import { setupStore } from './store';

const store = setupStore();

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(apiSlice.util.resetApiState());
});

afterAll(() => server.close());
