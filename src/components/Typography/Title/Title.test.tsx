import { render } from '@testing-library/react';

import { Title } from './Title';

import '@testing-library/jest-dom';

describe('Title component', () => {
  it('renders with default level', () => {
    const { container } = render(<Title>Default Title</Title>);
    const titleElement = container.querySelector('h3');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Default Title');
  });

  it('renders with level 1', () => {
    const { container } = render(<Title level="1">Level 1 Title</Title>);
    const titleElement = container.querySelector('h2');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Level 1 Title');
  });

  it('renders with level 2', () => {
    const { container } = render(<Title level="2">Level 2 Title</Title>);
    const titleElement = container.querySelector('h3');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Level 2 Title');
  });

  it('renders with level 3', () => {
    const { container } = render(<Title level="3">Level 3 Title</Title>);
    const titleElement = container.querySelector('h4');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Level 3 Title');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Title className="custom-class">Title with custom class</Title>,
    );
    const titleElement = container.querySelector('h3');
    expect(titleElement).toHaveClass('custom-class');
  });

  it('uses custom Component prop', () => {
    const { container } = render(
      <Title Component="h1">Custom Component Title</Title>,
    );
    const titleElement = container.querySelector('h1');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Custom Component Title');
  });
});
