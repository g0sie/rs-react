import { screen, fireEvent } from '@testing-library/react';

import { renderWithProvider } from '../../utils/renderWithProvider';

import Home from './Home';

describe('Home', () => {
  it('Searches for cards successfully', async () => {
    renderWithProvider(<Home />);
    const searchBar = screen.getByRole('textbox');

    fireEvent.change(searchBar, { target: { value: 'kakashi' } });
    fireEvent.submit(searchBar);

    await screen.findAllByTestId('card');
    expect(screen.getByText('Kakashi')).toBeDefined();
    expect(screen.getByText('Kakashi Hatake')).toBeDefined();
    expect(screen.getByText('Kakashi no Keishin')).toBeDefined();
    expect(screen.getAllByTestId('card').length).toEqual(3);
  });
});
