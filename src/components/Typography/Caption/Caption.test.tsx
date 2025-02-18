import { render } from '@testing-library/react';

import { Caption } from './Caption';

import '@testing-library/jest-dom';

describe('Caption Component', () => {
  it('renders with default level 1', () => {
    const { container } = render(<Caption>Test Caption</Caption>);
    expect(container.firstChild).toHaveClass('wrapper');
    expect(container.firstChild).toHaveClass('wrapper--1');
  });

  it('renders with level 2', () => {
    const { container } = render(<Caption level="2">Test Caption</Caption>);
    expect(container.firstChild).toHaveClass('wrapper');
    expect(container.firstChild).toHaveClass('wrapper--2');
  });

  it('applies additional className', () => {
    const { container } = render(
      <Caption className="additional-class">Test Caption</Caption>,
    );
    expect(container.firstChild).toHaveClass('wrapper');
    expect(container.firstChild).toHaveClass('wrapper--1');
    expect(container.firstChild).toHaveClass('additional-class');
  });

  it('renders with a custom component', () => {
    const { container } = render(
      <Caption Component="div">Test Caption</Caption>,
    );
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('passes additional props to Typography', () => {
    const { container } = render(
      <Caption aria-label="caption">Test Caption</Caption>,
    );
    expect(container.firstChild).toHaveAttribute('aria-label', 'caption');
  });
});
