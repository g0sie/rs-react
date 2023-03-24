import { render, screen } from '@testing-library/react';

import Forms from './Forms';

describe('Forms', () => {
  it('Renders heading', () => {
    render(<Forms />);
    expect(screen.getByText('Create an anime character')).toBeInTheDocument();
    expect(screen.getByTestId('create-card')).toBeInTheDocument();
  });
});
