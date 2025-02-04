import { render } from '@testing-library/react';

import { ImageBadge } from './ImageBadge';

import '@testing-library/jest-dom';

describe('ImageBadge', () => {
  it('renders without crashing', () => {
    const { container } = render(<ImageBadge type="number" />);
    expect(container).toBeInTheDocument();
  });

  it('renders Badge component when type is "number"', () => {
    const { container } = render(<ImageBadge type="number" />);
    expect(container.firstChild).toHaveClass('wrapper--number');
  });

  it('does not render Badge component when type is not "number"', () => {
    const { container } = render(<ImageBadge type="dot" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('applies additional className', () => {
    const { container } = render(<ImageBadge type="number" className="extra-class" />);
    expect(container.firstChild).toHaveClass('extra-class');
  });

  it('logs error when type is not "number"', () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    render(<ImageBadge type="dot" />);
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith('[ImageBadge]: Component supports only type="number"');
  });
});