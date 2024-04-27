import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import IndexPage from './page';

describe('Index Page', () => {
  it('should be render', () => {
    render(<IndexPage />);
    expect(screen.getByText(/StyleList94/)).toBeInTheDocument();
    expect(screen.getByText(/Content/)).toBeInTheDocument();
  });
});
