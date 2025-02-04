/**
 * @jest-environment node
 */

import { getBorderRadius } from './getBorderRadius';

describe('getBorderRadius', () => {
  it('should return 4 when size is less than 40', () => {
    expect(getBorderRadius(30)).toBe(4);
  });

  it('should return 8 when size is between 40 and 95', () => {
    expect(getBorderRadius(50)).toBe(8);
    expect(getBorderRadius(95)).toBe(8);
  });

  it('should return 12 when size is 96 or more', () => {
    expect(getBorderRadius(96)).toBe(12);
    expect(getBorderRadius(150)).toBe(12);
  });

  it('should handle edge cases correctly', () => {
    expect(getBorderRadius(0)).toBe(4);
    expect(getBorderRadius(40)).toBe(8);
    expect(getBorderRadius(95)).toBe(8);
    expect(getBorderRadius(96)).toBe(12);
  });
});
