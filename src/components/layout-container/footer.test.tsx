import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Footer from './footer';

describe('<Footer />', () => {
  it('should be render', () => {
    render(<Footer />);

    expect(screen.getByText('Blog')).toHaveAttribute(
      'href',
      'https://blog.stylelist94.dev',
    );

    expect(screen.getByText(/© 2024./)).toBeInTheDocument();
    expect(screen.getByText(/StyleList94/)).toHaveAttribute(
      'href',
      'https://github.com/StyleList94',
    );
    expect(screen.getByText(/ All rights reserved/)).toBeInTheDocument();
  });
});
