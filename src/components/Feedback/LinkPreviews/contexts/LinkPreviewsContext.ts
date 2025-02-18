'use client';

import { createContext } from 'react';

import { UseLinkPreviewsReturn } from '../hooks';

import { LPResponse } from '@/server';

export interface LinkPreviewsContextInterface extends UseLinkPreviewsReturn {}

export const LinkPreviewsContext = createContext<LinkPreviewsContextInterface>({
  error: undefined,
  loading: true,
  metadata: undefined,
  retry: async (): Promise<void> => {
    throw new Error('Function not implemented.');
  },
  fetcher: async (): Promise<LPResponse> => {
    throw new Error('Function not implemented.');
  },
});
