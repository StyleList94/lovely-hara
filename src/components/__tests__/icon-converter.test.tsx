import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';

import IconConverter from '../icon-converter';

describe('<IconConverter />', () => {
  it('should render', () => {
    render(<IconConverter />);

    expect(screen.getByText('Icon Converter')).toBeInTheDocument();
    expect(screen.getByText('아! 맞다 파비콘!')).toBeInTheDocument();

    expect(screen.getByLabelText('아이콘 이미지')).toBeInTheDocument();
    expect(
      screen.getByText('PNG 이미지를 여기에 끌어놓기'),
    ).toBeInTheDocument();
    expect(screen.getByText('또는 클릭해서 업로드')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('somthing icon')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Convert to ICO' }),
    ).toBeInTheDocument();
  });
});
