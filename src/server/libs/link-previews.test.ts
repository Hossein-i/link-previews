/**
 * @jest-environment node
 */

import { InvalidUrl, UnknownAction } from '@/errors';
import { LinkPreviews } from './link-previews';

describe('LinkPreviews', () => {
  let linkPreviews: LinkPreviews;

  beforeEach(() => {
    linkPreviews = new LinkPreviews();
  });

  it('should fetch metadata for a valid URL', async () => {
    const url = 'https://github.com';
    const metadata = await LinkPreviews.getUrlMetadata(url);
    expect(metadata).toEqual({
      title:
        'GitHub · Build and ship software on a single, collaborative platform',
      description:
        "Join the world's most widely adopted, AI-powered developer platform where millions of developers, businesses, and the largest open source community build software that advances humanity.",
      image: 'https://github.githubassets.com/assets/home24-5939032587c9.jpg',
      url: 'https://github.com',
    });
  });

  it('should return cached metadata if available', async () => {
    const url = 'https://github.com';
    const formData = new FormData();
    formData.append('url', url);

    const metadata = await linkPreviews.action(undefined, formData);
    expect(metadata.status).toBe('success');
    if ('data' in metadata) {
      expect(metadata.data.url).toBe(url);
    }

    const cachedMetadata = await linkPreviews.action(undefined, formData);
    expect(cachedMetadata).toEqual(metadata);
  });

  it('should handle invalid URL', async () => {
    const request = new Request('https://github.com/api?url=');
    await expect(linkPreviews.handler(request)).rejects.toThrow(InvalidUrl);
  });

  it('should handle unknown action', async () => {
    const request = new Request(
      'https://github.com/api?url=https://github.com',
      { method: 'PUT' }
    );
    await expect(linkPreviews.handler(request)).rejects.toThrow(UnknownAction);
  });

  it('should clear the cache', () => {
    linkPreviews.resetCache();
    expect(linkPreviews['cache'].size()).toBe(0);
  });
});
