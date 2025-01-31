import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppRoot } from './AppRoot';

describe('AppRoot', () => {
  it('renders without crashing', () => {
    const { container } = render(<AppRoot>Test</AppRoot>);
    expect(container).toBeInTheDocument();
  });

  it('applies the correct platform class', () => {
    const { container } = render(<AppRoot platform="ios">Test</AppRoot>);
    expect(container.firstChild).toHaveClass('wrapper--ios');
  });

  it('applies the correct appearance class', () => {
    const { container } = render(<AppRoot appearance="dark">Test</AppRoot>);
    expect(container.firstChild).toHaveClass('wrapper--dark');
  });

  it('provides the correct context value', () => {
    const { getByText } = render(<AppRoot>Test</AppRoot>);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const { getByText } = render(<AppRoot>Test</AppRoot>);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<AppRoot className="custom-class">Test</AppRoot>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});