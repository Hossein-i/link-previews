import { Decorator } from '@storybook/react';
import { StrictMode } from 'react';

export const StrictDecorator: Decorator = (Story) => (
  <StrictMode>
    <Story />
  </StrictMode>
);
