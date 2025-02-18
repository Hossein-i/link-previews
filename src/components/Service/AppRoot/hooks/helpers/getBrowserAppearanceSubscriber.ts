import { AppRootContextInterface } from '../../AppRootContext';

import { canUseDOM } from '@/helpers/dom';

export const getBrowserAppearanceSubscriber = (
  setAppearance: (
    appearance: NonNullable<AppRootContextInterface['appearance']>,
  ) => void,
): (() => void) => {
  if (!canUseDOM || !window.matchMedia) {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const listener = (event: MediaQueryListEvent) => {
    setAppearance(event.matches ? 'dark' : 'light');
  };

  mediaQuery.addEventListener('change', listener);

  return () => mediaQuery.removeEventListener('change', listener);
};
