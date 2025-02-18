import { render } from '@testing-library/react';

import { Divider } from './Divider';

import '@testing-library/jest-dom';

describe('Divider component', () => {
  test('renders without crashing', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(<Divider className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('applies additional HTML attributes', () => {
    const { container } = render(<Divider data-testid="divider" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'divider');
  });

  test('combines default and custom classNames', () => {
    const { container } = render(<Divider className="custom-class" />);
    expect(container.firstChild).toHaveClass('wrapper custom-class');
  });
});
