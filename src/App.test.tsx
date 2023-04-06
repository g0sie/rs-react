import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { routes } from './App';
import { App } from './App';

describe('App', () => {
  it('Renders header', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  describe('Routes', () => {
    it('Renders About page on /about', () => {
      const router = createMemoryRouter(routes, { initialEntries: ['/about'] });
      render(<RouterProvider router={router} />);
      expect(screen.getByText('About Us')).toBeInTheDocument();
    });

    it('Renders 404 page if invalid path', () => {
      const router = createMemoryRouter(routes, { initialEntries: ['/invalid-path'] });
      render(<RouterProvider router={router} />);
      expect(screen.getByText('404')).toBeInTheDocument();
    });
  });
});
