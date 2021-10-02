import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import MyApp from '../pages/_app';

describe('App', () => {
  test('renders App component', async () => {
    render(<MyApp />);
    await waitFor(() => screen.debug());
  });
});
