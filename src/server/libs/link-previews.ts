import * as Cheerio from 'cheerio';

import { Cache } from '../helpers/cache';

import { FetchFailed } from '@/errors/fetch-failed';
import { InvalidUrl } from '@/errors/invalid-url';
import { UnknownAction } from '@/errors/unknown-action';

/**
 * Success response from the action
 */
export type LPSuccessResponse = {
  /**
   * Status of the action
   */
  status: 'success';

  /**
   * Metadata object
   */
  data: Metadata;
};

/**
 * Failed response from the action
 */
export type LPFailedResponse = {
  /**
   * Status of the action
   */
  status: 'error';

  /**
   * Error message
   */
  error: string;
};

/**
 * Response from the action
 */
export type LPResponse = LPSuccessResponse | LPFailedResponse;

/**
 * Metadata object
 */
export interface Metadata {
  /**
   * Title of the page
   */
  title: string;

  /**
   * Description of the page
   */
  description: string;

  /**
   * Image URL of the page
   */
  image: string;

  /**
   * URL of the page
   */
  url: string;
}

export interface LinkPreviewsProps {
  /**
   * Time-to-live in milliseconds for the cache
   *
   * @default 3.6e+6
   */
  ttl?: number;
}

/**
 * LinkPreviews class to fetch metadata from a URL and cache it for a certain time period (TTL)
 *
 * @example
 * ```tsx
 * // libs/link-previews.ts
 * import { LinkPreviews } from 'link-previews/server';
 * export const { handler } = new LinkPreviews({ ttl: 3.6e+6 });
 *
 * // app/api/link-previews/route.ts
 * import { handler } from 'lib/link-previews';
 * export { handler as GET, handler as POST };
 *
 * // Or
 * // pages/api/link-previews.ts (Or pages/api/link-previews/index.ts)
 * import { handler } from 'lib/link-previews';
 * export default handler;
 *
 * // components/my-component.tsx
 * import { LinkPreviews } from 'link-previews';
 *
 * const MyComponent  = () => {
 *   return (<LinkPreviews url="https://example.com" />);
 * }
 * ```
 *
 * @example
 * ```tsx
 * // libs/link-previews.ts
 * import { LinkPreviews } from 'link-previews/server';
 * export const { action } = new LinkPreviews({ ttl: 3.6e+6 });
 *
 * // actions/link-previews.ts
 * "use server";
 * import { action } from 'lib/link-previews';
 * export default action;
 *
 * // components/my-component.tsx
 * import action from 'actions/link-previews';
 * import { LinkPreviews } from 'link-previews';
 *
 * const MyComponent  = () => {
 *   return (<LinkPreviews action={action} url="https://example.com" />);
 * }
 * ```
 */
export class LinkPreviews {
  /**
   * Cache for metadata
   */
  cache: Cache<Metadata>;

  /**
   * Create a new instance of LinkPreviews
   *
   * @param props - LinkPreviews properties (optional)
   */
  constructor(props?: LinkPreviewsProps) {
    const { ttl = 3.6e6 } = props || {};

    this.cache = new Cache<Metadata>(ttl);
  }

  /**
   * Get metadata from a URL
   *
   * @param url - URL to fetch metadata from
   *
   * @returns Metadata object with the URL
   *
   * @throws FetchFailed - Failed to fetch URL metadata
   *
   * @example
   * ```ts
   * const metadata = await LinkPreviews.getUrlMetadata('https://example.com');
   * console.log(metadata);
   * // {
   * //   title: 'Example Domain',
   * //   description: 'This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.',
   * //   image: '',
   * //   url: 'https://example.com'
   * // }
   * ```
   */
  static getUrlMetadata = async (
    url: string,
  ): Promise<Metadata & { url: string }> => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new FetchFailed(`Failed to fetch URL: ${res.statusText}`);
    }
    const content = await res.text();
    const $ = Cheerio.load(content);

    const title =
      $('meta[property="og:title"]').attr('content') || $('title').text() || '';
    const description =
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="description"]').attr('content') ||
      '';
    const image = $('meta[property="og:image"]').attr('content') || '';

    return { title, description, image, url };
  };

  /**
   * Action to get metadata from a URL
   *
   * @param prevState - Previous state of the action
   * @param formData - Form data with the URL
   *
   * @returns Metadata object with the URL
   *
   * @throws FetchFailed - Failed to fetch URL metadata
   */
  action = async (
    prevState: LPResponse | undefined,
    formData: FormData,
  ): Promise<LPResponse> => {
    try {
      const url = formData.get('url') as string;
      const cachedMetadata = this.cache.get(url);

      if (cachedMetadata) {
        if (prevState) {
          return prevState;
        }
        return { status: 'success', data: cachedMetadata };
      }

      const metadata = await LinkPreviews.getUrlMetadata(url);
      this.cache.set(url, metadata);
      return { status: 'success', data: metadata };
    } catch (error) {
      return { status: 'error', error: (error as Error).message };
    }
  };

  /**
   * Request handler for the action
   *
   * @param request - Request object
   *
   * @returns Response object
   *
   * @throws UnknownAction - Only GET and POST requests are supported
   * @throws InvalidUrl - Invalid URL
   * @throws FetchFailed - Failed to fetch URL metadata
   */
  handler = async (request: Request) => {
    if (request.method !== 'GET' && request.method !== 'POST') {
      throw new UnknownAction('Only GET and POST requests are supported');
    }

    const url = new URL(request.url);
    const { searchParams } = url;
    const inputUrl = searchParams.get('url');

    if (!inputUrl || typeof inputUrl !== 'string') {
      throw new InvalidUrl('Invalid URL');
    }

    const formData = new FormData();
    formData.append('url', inputUrl);
    const metadata = await this.action(undefined, formData);
    return Response.json(metadata, { status: 200 });
  };

  /**
   * Clear the cache for the action and reset the timer to the default TTL
   */
  resetCache = () => this.cache.clear();
}
