import { fireEvent, render, screen } from '@testing-library/react';

import { Image } from './Image';

import '@testing-library/jest-dom';

describe('Image Component', () => {
  it('renders an image with the correct src and alt attributes', () => {
    render(<Image src="test.jpg" alt="Test Image" />);
    const imgElement = screen.getByAltText('Test Image');
    expect(imgElement).toHaveAttribute('src', 'test.jpg');
  });

  it('applies the correct size to the image container', () => {
    render(<Image src="test.jpg" size={48} />);
    const container = screen.getByRole('img').parentElement;
    expect(container).toHaveStyle({ width: '48px', height: '48px' });
  });

  it('displays fallback icon when image fails to load', () => {
    render(
      <Image src="invalid.jpg" fallbackIcon={<span>Fallback Icon</span>} />,
    );
    const imgElement = screen.getByRole('img');
    fireEvent.error(imgElement);
    expect(screen.getByText('Fallback Icon')).toBeInTheDocument();
  });

  it('calls onLoad when the image loads successfully', () => {
    const handleLoad = jest.fn();
    render(<Image src="test.jpg" onLoad={handleLoad} />);
    const imgElement = screen.getByRole('img');
    fireEvent.load(imgElement);
    expect(handleLoad).toHaveBeenCalled();
  });

  it('calls onError when the image fails to load', () => {
    const handleError = jest.fn();
    render(<Image src="invalid.jpg" onError={handleError} />);
    const imgElement = screen.getByRole('img');
    fireEvent.error(imgElement);
    expect(handleError).toHaveBeenCalled();
  });

  it('renders children inside the image container', () => {
    render(
      <Image src="test.jpg">
        <span>Child Element</span>
      </Image>,
    );
    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });
});
