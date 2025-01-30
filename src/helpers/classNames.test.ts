/**
 * @jest-environment node
 */

import { classNames } from './classNames';

describe('classNames', () => {
  it('should return an empty string when no arguments are provided', () => {
    expect(classNames()).toBe('');
  });

  it('should concatenate string arguments', () => {
    expect(classNames('class1', 'class2')).toBe('class1 class2');
  });

  it('should ignore undefined, null, and false values', () => {
    expect(classNames('class1', undefined, null, false, 'class2')).toBe(
      'class1 class2'
    );
  });

  it('should handle numbers correctly', () => {
    expect(classNames('class1', 123, 'class2')).toBe('class1 123 class2');
  });

  it('should handle objects with boolean values', () => {
    expect(classNames({ class1: true, class2: false, class3: true })).toBe(
      'class1 class3'
    );
  });

  it('should handle mixed types', () => {
    expect(
      classNames('class1', { class2: true, class3: false }, 123, null, 'class4')
    ).toBe('class1 class2 123 class4');
  });
});
