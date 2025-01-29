import { isApplePlatform } from '@/helpers/platform';

export const getInitialPlatform = () => {
  if (isApplePlatform()) {
    return 'ios';
  }

  return 'base';
};
