import { isApplePlatform } from './platform';

describe('isApplePlatform', () => {
  it('should return true for iPad user agent', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'iPad',
      writable: true,
    });
    expect(isApplePlatform()).toBe(true);
  });

  it('should return true for iPhone user agent', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'iPhone',
      writable: true,
    });
    expect(isApplePlatform()).toBe(true);
  });

  it('should return true for iPod user agent', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'iPod',
      writable: true,
    });
    expect(isApplePlatform()).toBe(true);
  });

  it('should return true for Macintosh user agent', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Macintosh',
      writable: true,
    });
    expect(isApplePlatform()).toBe(true);
  });

  it('should return true for MacIntel user agent', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'MacIntel',
      writable: true,
    });
    expect(isApplePlatform()).toBe(true);
  });

  it('should return true for MacPPC user agent', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'MacPPC',
      writable: true,
    });
    expect(isApplePlatform()).toBe(true);
  });

  it('should return true for Mac68K user agent', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mac68K',
      writable: true,
    });
    expect(isApplePlatform()).toBe(true);
  });

  it('should return false for non-Apple user agent', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Windows',
      writable: true,
    });
    expect(isApplePlatform()).toBe(false);
  });

  it('should return false if MSStream is defined', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'iPad',
      writable: true,
    });
    (window as any).MSStream = true;
    expect(isApplePlatform()).toBe(false);
    delete (window as any).MSStream;
  });
});
