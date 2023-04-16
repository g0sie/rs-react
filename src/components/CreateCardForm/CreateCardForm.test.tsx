import { render, screen } from '@testing-library/react';

import CreateCardForm from './CreateCardForm';

describe('CreateCardForm', () => {
  it('Renders the form', () => {
    render(<CreateCardForm handleSubmit={() => {}} />);
    expect(screen.getByTestId('create-card')).toBeInTheDocument();
    expect(screen.getByLabelText('Name*')).toBeInTheDocument();
    expect(screen.getByLabelText('Name in kanji')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of birth*')).toBeInTheDocument();
    expect(screen.getByLabelText('Pronouns')).toBeInTheDocument();
    expect(screen.getByText('Blood type')).toBeInTheDocument();
    expect(screen.getByLabelText('A')).toBeChecked();
    expect(screen.getByLabelText('B')).not.toBeChecked();
    expect(screen.getByLabelText('O')).not.toBeChecked();
    expect(screen.getByLabelText('AB')).not.toBeChecked();
    expect(screen.getByText('Is dead')).toBeInTheDocument();
    expect(screen.getByLabelText('dead')).not.toBeChecked();
    expect(screen.getByLabelText('Upload image*')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
