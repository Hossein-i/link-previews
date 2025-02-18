'use client';

import { useContext, useEffect, useState } from 'react';

import { AppRootContext, AppRootContextInterface } from '../AppRootContext';
import { getBrowserAppearanceSubscriber } from './helpers/getBrowserAppearanceSubscriber';
import { getInitialAppearance } from './helpers/getInitialAppearance';

export const useAppearance = (
  appearanceProp?: AppRootContextInterface['appearance'],
): NonNullable<AppRootContextInterface['appearance']> => {
  const { appearance: contextAppearance } = useContext(AppRootContext);
  const [appearance, setAppearance] = useState(
    appearanceProp || contextAppearance || getInitialAppearance(),
  );

  useEffect(() => {
    if (appearanceProp !== undefined) {
      setAppearance(appearanceProp);
      return () => {};
    }

    return getBrowserAppearanceSubscriber(setAppearance);
  }, [appearanceProp]);

  return appearance;
};
