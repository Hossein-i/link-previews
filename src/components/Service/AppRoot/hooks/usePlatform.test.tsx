import { render } from '@testing-library/react';

import { AppRootContext, AppRootContextInterface } from '../AppRootContext';
import { getInitialPlatform } from './helpers/getInitialPlatform';
import { usePlatform } from './usePlatform';

import '@testing-library/jest-dom';

jest.mock('./helpers/getInitialPlatform');

const TestComponent = ({
  platform,
}: {
  platform?: 'base' | 'ios' | undefined;
}) => {
  const result = usePlatform(platform);
  return <div>{result}</div>;
};

describe('usePlatform', () => {
  const mockGetInitialPlatform = getInitialPlatform as jest.Mock;

  beforeEach(() => {
    mockGetInitialPlatform.mockReturnValue('defaultPlatform');
  });

  it('should return the provided platform if defined', () => {
    const { getByText } = render(<TestComponent platform="ios" />);
    expect(getByText('ios')).toBeInTheDocument();
  });

  it('should return the platform from context if rendered and platform is defined', () => {
    const contextValue: AppRootContextInterface = {
      isRendered: true,
      platform: 'ios',
    };

    const { getByText } = render(
      <AppRootContext.Provider value={contextValue}>
        <TestComponent />
      </AppRootContext.Provider>,
    );
    expect(getByText('ios')).toBeInTheDocument();
  });

  it('should return the initial platform if context is not rendered', () => {
    const contextValue: AppRootContextInterface = {
      isRendered: false,
      platform: undefined,
    };

    const { getByText } = render(
      <AppRootContext.Provider value={contextValue}>
        <TestComponent />
      </AppRootContext.Provider>,
    );
    expect(getByText('defaultPlatform')).toBeInTheDocument();
  });

  it('should return the initial platform if context platform is undefined', () => {
    const contextValue: AppRootContextInterface = {
      isRendered: true,
      platform: undefined,
    };

    const { getByText } = render(
      <AppRootContext.Provider value={contextValue}>
        <TestComponent />
      </AppRootContext.Provider>,
    );
    expect(getByText('defaultPlatform')).toBeInTheDocument();
  });
});
