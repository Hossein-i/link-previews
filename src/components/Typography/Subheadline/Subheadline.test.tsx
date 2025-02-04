import { render } from '@testing-library/react';

import { Subheadline } from './Subheadline';

import '@testing-library/jest-dom';

describe('Subheadline component', () => {
  it('renders with default level', () => {
    const { getByText } = render(<Subheadline>Test Subheadline</Subheadline>);
    const subheadlineElement = getByText('Test Subheadline');
    expect(subheadlineElement.tagName).toBe('H6');
    expect(subheadlineElement).toHaveClass('wrapper');
    expect(subheadlineElement).toHaveClass('wrapper--1');
  });

  it('renders with level 2', () => {
    const { getByText } = render(<Subheadline level="2">Test Subheadline</Subheadline>);
    const subheadlineElement = getByText('Test Subheadline');
    expect(subheadlineElement).toHaveClass('wrapper--2');
  });

  it('applies custom className', () => {
    const { getByText } = render(<Subheadline className="custom-class">Test Subheadline</Subheadline>);
    const subheadlineElement = getByText('Test Subheadline');
    expect(subheadlineElement).toHaveClass('custom-class');
  });

  it('renders with custom component', () => {
    const { getByText } = render(<Subheadline Component="div">Test Subheadline</Subheadline>);
    const subheadlineElement = getByText('Test Subheadline');
    expect(subheadlineElement.tagName).toBe('DIV');
  });
});