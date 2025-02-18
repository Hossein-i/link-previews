import { render } from '@testing-library/react';

import { LargeTitle } from './LargeTitle';

import '@testing-library/jest-dom';

describe('LargeTitle', () => {
  it('renders with default h1 element', () => {
    const { container } = render(<LargeTitle>Test Title</LargeTitle>);
    const element = container.querySelector('h1');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Test Title');
  });

  it('applies custom className', () => {
    const { container } = render(
      <LargeTitle className="custom-class">Test Title</LargeTitle>,
    );
    const element = container.querySelector('h1');
    expect(element).toHaveClass('custom-class');
  });

  it('renders with a different component when specified', () => {
    const { container } = render(
      <LargeTitle Component="h2">Test Title</LargeTitle>,
    );
    const element = container.querySelector('h2');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Test Title');
  });

  it('passes additional props to the Typography component', () => {
    const { container } = render(
      <LargeTitle data-testid="large-title">Test Title</LargeTitle>,
    );
    const element = container.querySelector('h1');
    expect(element).toHaveAttribute('data-testid', 'large-title');
  });
});
