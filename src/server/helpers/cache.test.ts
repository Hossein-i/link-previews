/**
 * @jest-environment node
 */

import { Cache } from './cache';

describe('Cache', () => {
  let cache: Cache<string>;

  beforeEach(() => {
    cache = new Cache<string>();
  });

  test('should set and get a value', () => {
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
  });

  test('should return null for non-existent key', () => {
    expect(cache.get('nonExistentKey')).toBeNull();
  });

  test('should delete a key', () => {
    cache.set('key1', 'value1');
    cache.delete('key1');
    expect(cache.get('key1')).toBeNull();
  });

  test('should clear the cache', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.clear();
    expect(cache.get('key1')).toBeNull();
    expect(cache.get('key2')).toBeNull();
  });

  test('should respect the TTL', (done) => {
    cache.set('key1', 'value1', 100);
    setTimeout(() => {
      expect(cache.get('key1')).toBeNull();
      done();
    }, 200);
  });

  test('should overwrite existing key', () => {
    cache.set('key1', 'value1');
    cache.set('key1', 'value2');
    expect(cache.get('key1')).toBe('value2');
  });

  test('should return the size of the cache', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    expect(cache.size()).toBe(2);
  });
});
