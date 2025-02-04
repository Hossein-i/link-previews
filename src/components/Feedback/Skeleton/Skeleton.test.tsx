import styles from './Skeleton.module.css';

import { render, screen } from '@testing-library/react';

import { Skeleton } from './Skeleton';

import '@testing-library/jest-dom';

describe('Skeleton Component', () => {
  it('renders the skeleton with default props', () => {
    render(<Skeleton />);

    // Check if the skeleton wrapper is rendered
    const skeletonWrapper = screen.getByTestId('skeleton-wrapper');
    expect(skeletonWrapper).toBeInTheDocument();

    // Check if the default classes are applied
    expect(skeletonWrapper).toHaveClass(styles.wrapper);
    expect(skeletonWrapper).toHaveClass(styles['wrapper--visible']);
    expect(skeletonWrapper).not.toHaveClass(styles['wrapper--noAnimation']);
  });

  it('renders the skeleton without animation when withoutAnimation is true', () => {
    render(<Skeleton withoutAnimation />);

    const skeletonWrapper = screen.getByTestId('skeleton-wrapper');
    expect(skeletonWrapper).toHaveClass(styles['wrapper--noAnimation']);
  });

  it('hides the skeleton when visible is false', () => {
    render(<Skeleton visible={false} />);

    const skeletonWrapper = screen.getByTestId('skeleton-wrapper');
    expect(skeletonWrapper).not.toHaveClass(styles['wrapper--visible']);
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    render(<Skeleton className={customClass} />);

    const skeletonWrapper = screen.getByTestId('skeleton-wrapper');
    expect(skeletonWrapper).toHaveClass(customClass);
  });

  it('renders children correctly', () => {
    render(
      <Skeleton>
        <div data-testid="child">Child Content</div>
      </Skeleton>,
    );

    const childElement = screen.getByTestId('child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Child Content');
  });
});