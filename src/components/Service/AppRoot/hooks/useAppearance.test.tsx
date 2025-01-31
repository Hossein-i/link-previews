import "@testing-library/jest-dom";
import { render } from '@testing-library/react';
import { AppRootContext } from '../AppRootContext';
import { getBrowserAppearanceSubscriber } from './helpers/getBrowserAppearanceSubscriber';
import { getInitialAppearance } from './helpers/getInitialAppearance';
import { useAppearance } from './useAppearance';

jest.mock('./helpers/getInitialAppearance');
jest.mock('./helpers/getBrowserAppearanceSubscriber');

const TestComponent = ({ appearanceProp }: { appearanceProp?: "light" | "dark" }) => {
  const appearance = useAppearance(appearanceProp);
  return <div>{appearance}</div>;
};

describe('useAppearance', () => {
  const mockGetInitialAppearance = getInitialAppearance as jest.Mock;
  const mockGetBrowserAppearanceSubscriber = getBrowserAppearanceSubscriber as jest.Mock;

  beforeEach(() => {
    mockGetInitialAppearance.mockReturnValue('light');
    mockGetBrowserAppearanceSubscriber.mockReturnValue(jest.fn());
  });

  it('should return initial appearance from context', () => {
    const { getByText } = render(
      <AppRootContext.Provider value={{ appearance: 'dark', isRendered: true }}>
        <TestComponent />
      </AppRootContext.Provider>
    );

    expect(getByText('dark')).toBeInTheDocument();
  });

  it('should return initial appearance from prop', () => {
    const { getByText } = render(<TestComponent appearanceProp="dark" />);

    expect(getByText('dark')).toBeInTheDocument();
  });

  it('should return initial appearance from getInitialAppearance', () => {
    const { getByText } = render(<TestComponent />);

    expect(getByText('light')).toBeInTheDocument();
  });

  it('should update appearance when appearanceProp changes', () => {
    const { getByText, rerender } = render(<TestComponent appearanceProp="light" />);

    expect(getByText('light')).toBeInTheDocument();

    rerender(<TestComponent appearanceProp="dark" />);

    expect(getByText('dark')).toBeInTheDocument();
  });

  it('should subscribe to browser appearance changes when appearanceProp is undefined', () => {
    render(<TestComponent />);

    expect(mockGetBrowserAppearanceSubscriber).toHaveBeenCalled();
  });
});