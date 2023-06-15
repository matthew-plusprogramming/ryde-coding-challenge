import { render, screen } from '@testing-library/react';
import React from 'react';
import { test } from 'vitest';
import App from './App';

// TODO: Update this file to include new tests
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
