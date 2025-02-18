import { render, screen } from '@testing-library/react';

import { Link } from './Link';

import '@testing-library/jest-dom';

describe('Link component', () => {
  test('renders children correctly', () => {
    render(<Link href="https://example.com">Click me</Link>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('applies className correctly', () => {
    render(
      <Link href="https://example.com" className="custom-class">
        Click me
      </Link>,
    );
    const linkElement = screen.getByText('Click me');
    expect(linkElement).toHaveClass('custom-class');
  });

  test('passes props correctly', () => {
    render(<Link href="https://example.com">Click me</Link>);
    const linkElement = screen.getByText('Click me');
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
  });
});
