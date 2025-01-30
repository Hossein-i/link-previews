/**
 * @jest-environment node
 */

import { isObjectLike } from './object';

describe('isObjectLike', () => {
  it('should return true for objects', () => {
    expect(isObjectLike({})).toBe(true);
    expect(isObjectLike({ a: 1 })).toBe(true);
  });

  it('should return true for arrays', () => {
    expect(isObjectLike([])).toBe(true);
    expect(isObjectLike([1, 2, 3])).toBe(true);
  });

  it('should return false for null', () => {
    expect(isObjectLike(null)).toBe(false);
  });

  it('should return false for non-objects', () => {
    expect(isObjectLike(42)).toBe(false);
    expect(isObjectLike('string')).toBe(false);
    expect(isObjectLike(true)).toBe(false);
    expect(isObjectLike(undefined)).toBe(false);
  });

  it('should return false for functions', () => {
    expect(isObjectLike(() => {})).toBe(false);
    expect(isObjectLike(function () {})).toBe(false);
  });
});
