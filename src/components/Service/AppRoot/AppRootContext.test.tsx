import React from 'react';
import { render } from '@testing-library/react';
import { AppRootContext, AppRootContextInterface } from './AppRootContext';
import '@testing-library/jest-dom';

describe('AppRootContext', () => {
  it('should provide default context values', () => {
    const TestComponent = () => {
      const context = React.useContext(AppRootContext);
      return <div>{context.isRendered ? 'Rendered' : 'Not Rendered'}</div>;
    };

    const { getByText } = render(
      <AppRootContext.Provider value={{ isRendered: false }}>
        <TestComponent />
      </AppRootContext.Provider>
    );
    expect(getByText('Not Rendered')).toBeInTheDocument();
    expect(getByText('Not Rendered')).toBeInTheDocument();
  });

  it('should provide custom context values', () => {
    const customContext: AppRootContextInterface = {
      platform: 'ios',
      appearance: 'dark',
      isRendered: true,
    };

    const TestComponent = () => {
      const context = React.useContext(AppRootContext);
      return (
        <div>
          {context.isRendered ? 'Rendered' : 'Not Rendered'}, {context.platform}, {context.appearance}
        </div>
      );
    };

    const { getByText } = render(
      <AppRootContext.Provider value={customContext}>
        <TestComponent />
      </AppRootContext.Provider>
    );

    expect(getByText('Rendered, ios, dark')).toBeInTheDocument();
  });
});