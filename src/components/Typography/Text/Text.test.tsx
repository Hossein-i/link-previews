import React from 'react';

import { render } from '@testing-library/react';

import { Text } from './Text';

import '@testing-library/jest-dom';

describe('Text component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Text>Sample Text</Text>);
    expect(container).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Text className="custom-class">Sample Text</Text>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with default component as span', () => {
    const { container } = render(<Text>Sample Text</Text>);
    expect(container.firstChild?.nodeName).toBe('SPAN');
  });

  it('renders with custom component', () => {
    const { container } = render(<Text Component="p">Sample Text</Text>);
    expect(container.firstChild?.nodeName).toBe('P');
  });

  it('forwards ref to the underlying component', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Text ref={ref}>Sample Text</Text>);
    expect(ref.current).not.toBeNull();
  });
});
