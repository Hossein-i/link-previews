import { render } from '@testing-library/react';

import { Badge, BadgeProps } from './Badge';

import '@testing-library/jest-dom';

describe('Badge component', () => {
  const renderBadge = (props: Partial<BadgeProps> = {}) => {
    const defaultProps: BadgeProps = {
      type: 'number',
      children: '1',
    };
    return render(<Badge {...defaultProps} {...props} />);
  };

  it('renders correctly with default props', () => {
    const { container } = renderBadge();
    expect(container.firstChild).toHaveClass('wrapper--number');
    expect(container.firstChild).toHaveClass('wrapper--primary');
  });

  it('renders correctly with type "dot"', () => {
    const { container } = renderBadge({ type: 'dot' });
    expect(container.firstChild).toHaveClass('wrapper--dot');
  });

  it('renders correctly with different modes', () => {
    const modes: BadgeProps['mode'][] = ['primary', 'critical', 'secondary', 'gray', 'white'];
    modes.forEach((mode) => {
      const { container } = renderBadge({ mode });
      expect(container.firstChild).toHaveClass(`wrapper--${mode}`);
    });
  });

  it('renders correctly with large prop', () => {
    const { container } = renderBadge({ large: true });
    expect(container.firstChild).toHaveClass('wrapper--large');
  });

  it('renders children correctly when type is "number"', () => {
    const { getByText } = renderBadge({ children: '99' });
    expect(getByText('99')).toBeInTheDocument();
  });

  it('does not render children when type is "dot"', () => {
    const { container } = renderBadge({ type: 'dot', children: '99' });
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('applies custom className', () => {
    const { container } = renderBadge({ className: 'custom-class' });
    expect(container.firstChild).toHaveClass('custom-class');
  });
});