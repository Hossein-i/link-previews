import { hasReactNode, isPrimitiveReactNode } from './node';

describe('hasReactNode', () => {
  it('should return false for undefined', () => {
    expect(hasReactNode(undefined)).toBe(false);
  });

  it('should return false for null', () => {
    expect(hasReactNode(null)).toBe(false);
  });

  it('should return false for false', () => {
    expect(hasReactNode(false)).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(hasReactNode('')).toBe(false);
  });

  it('should return true for non-empty string', () => {
    expect(hasReactNode('Hello')).toBe(true);
  });

  it('should return true for number', () => {
    expect(hasReactNode(123)).toBe(true);
  });

  it('should return true for React element', () => {
    const element = <div />;
    expect(hasReactNode(element)).toBe(true);
  });
});

describe('isPrimitiveReactNode', () => {
  it('should return true for string', () => {
    expect(isPrimitiveReactNode('Hello')).toBe(true);
  });

  it('should return true for number', () => {
    expect(isPrimitiveReactNode(123)).toBe(true);
  });

  it('should return false for React element', () => {
    const element = <div />;
    expect(isPrimitiveReactNode(element)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isPrimitiveReactNode(undefined)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isPrimitiveReactNode(null)).toBe(false);
  });

  it('should return false for boolean', () => {
    expect(isPrimitiveReactNode(true)).toBe(false);
  });
});
