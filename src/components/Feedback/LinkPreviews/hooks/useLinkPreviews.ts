import { useCallback, useEffect, useState } from 'react';

import { InvalidUrl } from '@/errors/invalid-url';
import type { LPResponse } from '@/server';

export interface UseLinkPreviewsProps {
  /** The URL to fetch metadata for. */
  url: string;

  /**
   * Optional custom fetcher function to retrieve metadata for the given URL.
   * If not provided, a default fetcher will be used.
   *
   * @param {LPResponse | undefined} prevState - Previous state of the fetcher
   * @param {FormData} formData - Form data with the URL
   *
   * @returns A promise that resolves to an LPResponse object containing the metadata.
   */
  fetcher?: (
    prevState: LPResponse | undefined,
    formData: FormData,
  ) => Promise<LPResponse>;
}

/**
 * Fetches link preview data for a given URL.
 *
 * This function constructs a URL with the provided `url` parameter appended as a query string
 * to the `/api/link-previews` endpoint of the current origin. It then performs a fetch request
 * to this constructed URL and returns the JSON response.
 *
 * @param _prevState - Previous state of the fetcher
 * @param formData - Form data with the URL
 *
 * @returns A promise that resolves to the link preview response data.
 */
const defaultFetcher: UseLinkPreviewsProps['fetcher'] = async (
  _prevState,
  formData,
) => {
  const url = formData.get('url');

  if (!url || typeof url !== 'string') {
    throw new InvalidUrl('Invalid Url');
  }

  const input = new URL('/api/link-previews', window.location.origin);
  input.searchParams.append('url', url.toString());
  const response: LPResponse = await fetch(input).then((res) => res.json());
  return response;
};

/**
 * Custom hook to fetch and manage link preview metadata.
 *
 * @example
 * const { metadata, error } = useLinkPreviews({ url: 'https://example.com' });
 */
export const useLinkPreviews = ({
  url,
  fetcher = defaultFetcher,
}: UseLinkPreviewsProps) => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<LPResponse>();
  const metadata = response?.status === 'success' ? response.data : undefined;

  /**
   * Fetches metadata for a given URL using the fetcher function.
   *
   * This function is memoized using `useCallback` and will only change if the `url` changes.
   * It attempts to fetch metadata and updates the state with the fetched data or an error message.
   */
  const fetchMetadata = useCallback(async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('url', url);
      const res = await fetcher(response, formData);

      setResponse(res);

      if (res.status === 'error') {
        setError(res.error);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  /**
   * Effect hook that triggers the `fetchMetadata` function whenever the `url` changes.
   *
   * This ensures that the metadata is fetched and updated in the state whenever the URL is updated.
   * The `fetchMetadata` function is memoized and will only be re-created if the `url` changes.
   */
  useEffect(() => {
    fetchMetadata();
  }, [url]);

  return { error, loading, metadata, retry: fetchMetadata, fetcher };
};

export type UseLinkPreviewsReturn = ReturnType<typeof useLinkPreviews>;
