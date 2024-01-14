import { render, screen } from '@testing-library/react';
import IndexPage from './page';

describe('Index Page', () => {
  it('should be render', () => {
    render(<IndexPage />);
    expect(screen.getByText(/Stylish Next App/)).toBeInTheDocument();
  });
});
