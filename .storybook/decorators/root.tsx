import { Decorator } from '@storybook/react';
import { AppRoot } from '@/components';

export const AppRootDecorator: Decorator = (Story, context) => (
  <AppRoot
    platform={context.globals.platform}
    appearance={context.globals.theme}
  >
    <Story />
  </AppRoot>
);
