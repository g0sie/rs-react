import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import Forms from './Forms';

const setup = () => {
  const nameInput = screen.getByLabelText('Name*');
  const kanjiNameInput = screen.getByLabelText('Name in kanji');
  const birthDateInput = screen.getByLabelText('Date of birth*');
  const pronounsInput = screen.getByLabelText('Pronouns');
  const blood_A_input = screen.getByLabelText('A');
  const blood_B_input = screen.getByLabelText('B');
  const blood_O_input = screen.getByLabelText('O');
  const blood_AB_input = screen.getByLabelText('AB');
  const isDeadInput = screen.getByLabelText('dead');
  const imgInput = screen.getByLabelText('Upload image*');
  const submitBtn = screen.getByRole('button');
  return {
    nameInput,
    kanjiNameInput,
    birthDateInput,
    pronounsInput,
    blood_A_input,
    blood_B_input,
    blood_O_input,
    blood_AB_input,
    isDeadInput,
    imgInput,
    submitBtn,
  };
};

describe('Forms', () => {
  it('Renders heading', () => {
    render(<Forms />);
    expect(screen.getByText('Create an anime character')).toBeInTheDocument();
  });
  it('Renders form', () => {
    render(<Forms />);
    expect(screen.getByTestId('create-card')).toBeInTheDocument();
  });
  it('Renders cards', () => {
    render(<Forms />);
    expect(screen.getByTestId('cards')).toBeInTheDocument();
  });
  it('Creates a card successfully', () => {
    global.URL.createObjectURL = vi.fn();
    render(<Forms />);
    const {
      nameInput,
      kanjiNameInput,
      birthDateInput,
      pronounsInput,
      blood_B_input,
      isDeadInput,
      imgInput,
      submitBtn,
    } = setup();
    const imgFile = new File(['blob'], 'awesomename.png', { type: 'image/png' });
    fireEvent.change(nameInput, { target: { value: 'Awesome Name' } });
    fireEvent.change(kanjiNameInput, { target: { value: 'こんにちは' } });
    fireEvent.change(birthDateInput, { target: { value: '2023-03-07' } });
    fireEvent.select(pronounsInput, { target: { value: 'she' } });
    fireEvent.change(blood_B_input, { target: { checked: true } });
    fireEvent.change(isDeadInput, { target: { checked: true } });
    fireEvent.change(imgInput, { target: { files: [imgFile] } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('The data has been saved.')).toBeInTheDocument();
    expect(screen.getByText('Awesome Name')).toBeInTheDocument();
    expect(screen.getAllByTestId('card')).toHaveLength(1);
  });
});
