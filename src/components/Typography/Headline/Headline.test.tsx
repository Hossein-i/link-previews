import { render } from '@testing-library/react';

import { Headline } from './Headline';

import '@testing-library/jest-dom';

describe('Headline Component', () => {
  it('renders with default h5 tag', () => {
    const { container } = render(<Headline>Test Headline</Headline>);
    const headlineElement = container.querySelector('h5');
    expect(headlineElement).toBeInTheDocument();
    expect(headlineElement).toHaveTextContent('Test Headline');
  });

  it('renders with custom tag', () => {
    const { container } = render(<Headline Component="h2">Test Headline</Headline>);
    const headlineElement = container.querySelector('h2');
    expect(headlineElement).toBeInTheDocument();
    expect(headlineElement).toHaveTextContent('Test Headline');
  });

  it('applies custom className', () => {
    const { container } = render(<Headline className="custom-class">Test Headline</Headline>);
    const headlineElement = container.querySelector('h5');
    expect(headlineElement).toHaveClass('custom-class');
  });

  it('passes additional props to Typography component', () => {
    const { container } = render(<Headline data-testid="headline">Test Headline</Headline>);
    const headlineElement = container.querySelector('h5');
    expect(headlineElement).toHaveAttribute('data-testid', 'headline');
  });
});