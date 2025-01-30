/**
 * @jest-environment node
 */

import { isEqual } from './equal';

describe('isEqual', () => {
  it('should return true for equal primitive values', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('test', 'test')).toBe(true);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
  });

  it('should return false for different primitive values', () => {
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual('test', 'Test')).toBe(false);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(null, undefined)).toBe(false);
  });

  it('should return true for equal objects', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(isEqual({ a: { b: 2 } }, { a: { b: 2 } })).toBe(true);
  });

  it('should return false for different objects', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    expect(isEqual({ a: { b: 2 } }, { a: { b: 3 } })).toBe(false);
  });

  it('should return true for equal arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toBe(true);
  });

  it('should return false for different arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(isEqual([1, 2, 3], [1, 2])).toBe(false);
    expect(isEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 3 }])).toBe(false);
  });

  it('should return false for objects with different keys', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false);
  });

  it('should return true for deeply nested equal objects', () => {
    expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBe(true);
  });

  it('should return false for deeply nested different objects', () => {
    expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).toBe(false);
  });
});
