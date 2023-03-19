import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

describe('Header', () => {
  it('Renders Home link', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('Renders About Us link', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'About Us' })).toBeInTheDocument();
  });
});
