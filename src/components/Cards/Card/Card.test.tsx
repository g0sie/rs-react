import { render, screen } from '@testing-library/react';

import Card from './Card';

import { character } from './character.example';

describe('Card', () => {
  it('Renders Sasuke', () => {
    render(<Card {...character} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', character.images.webp.image_url);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Sasuke Uchiha');
    expect(screen.getByText('うちは サスケ')).toBeInTheDocument();
    expect(screen.getByText('🩵 27984')).toBeInTheDocument();
  });
});
