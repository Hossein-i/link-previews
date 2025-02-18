'use client';

import { AppRootContextInterface } from '@/components/Service/AppRoot/AppRootContext';
import { useAppRootContext } from '@/hooks/useAppRootContext';

export const usePlatform = (): NonNullable<
  AppRootContextInterface['platform']
> => {
  const context = useAppRootContext();
  return context.platform || 'base';
};
