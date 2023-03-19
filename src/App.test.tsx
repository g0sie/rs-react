import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { App, WrappedApp } from './App';

describe('App', () => {
  it('Renders header', () => {
    render(<WrappedApp />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('Renders 404 page if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-path']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('404');
  });
});
