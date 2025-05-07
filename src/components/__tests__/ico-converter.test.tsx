import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import IcoConverter from '../ico-converter';

describe('<IcoConverter />', () => {
  it('should be render', () => {
    render(<IcoConverter />);

    expect(screen.getByText('ICO Converter')).toBeInTheDocument();
    expect(screen.getByText('파비콘 만들기')).toBeInTheDocument();

    expect(screen.getByLabelText('아이콘 이미지')).toBeInTheDocument();
    expect(
      screen.getByText('PNG 이미지를 여기에 끌어놓기'),
    ).toBeInTheDocument();
    expect(screen.getByText('또는 클릭해서 업로드')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('somthing icon')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Convert' })).toBeInTheDocument();
  });
});
