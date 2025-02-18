import { render } from '@testing-library/react';

import { Typography } from './Typography';

import '@testing-library/jest-dom';

describe('Typography Component', () => {
  it('renders with default props', () => {
    const { container } = render(<Typography>Test</Typography>);
    expect(container.firstChild).toHaveClass('wrapper');
    expect(container.firstChild).toHaveClass('wrapper--plain');
    expect(container.firstChild).toHaveClass('wrapper--weight-3');
  });

  it('renders with custom weight', () => {
    const { container } = render(<Typography weight="1">Test</Typography>);
    expect(container.firstChild).toHaveClass('wrapper--weight-1');
  });

  it('renders with caps', () => {
    const { container } = render(<Typography caps>Test</Typography>);
    expect(container.firstChild).toHaveClass('wrapper--caps');
  });

  it('renders with custom Component', () => {
    const { container } = render(<Typography Component="h1">Test</Typography>);
    expect((container.firstChild as Element).tagName).toBe('H1');
  });

  it('renders without plain class when plain is false', () => {
    const { container } = render(<Typography plain={false}>Test</Typography>);
    expect(container.firstChild).not.toHaveClass('wrapper--plain');
  });

  it('applies additional class names', () => {
    const { container } = render(
      <Typography className="custom-class">Test</Typography>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
