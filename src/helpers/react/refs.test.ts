import { MutableRefObject } from 'react';

import { multipleRef, setRef } from './refs';

describe('setRef', () => {
  it('should set ref as a function', () => {
    const refFunction = jest.fn();
    setRef('testElement', refFunction);
    expect(refFunction).toHaveBeenCalledWith('testElement');
  });

  it('should set ref as an object', () => {
    const refObject: MutableRefObject<string | null> = { current: null };
    setRef('testElement', refObject);
    expect(refObject.current).toBe('testElement');
  });

  it('should not throw if ref is undefined', () => {
    expect(() => setRef('testElement', undefined)).not.toThrow();
  });
});

describe('multipleRef', () => {
  it('should set all refs', () => {
    const refFunction1 = jest.fn();
    const refFunction2 = jest.fn();
    const refObject1: MutableRefObject<string | null> = { current: null };
    const refObject2: MutableRefObject<string | null> = { current: null };

    const combinedRef = multipleRef(
      refFunction1,
      refObject1,
      refFunction2,
      refObject2,
    );
    combinedRef.current = 'testElement';

    expect(refFunction1).toHaveBeenCalledWith('testElement');
    expect(refFunction2).toHaveBeenCalledWith('testElement');
    expect(refObject1.current).toBe('testElement');
    expect(refObject2.current).toBe('testElement');
  });

  it('should handle undefined refs', () => {
    const refFunction = jest.fn();
    const refObject: MutableRefObject<string | null> = { current: null };

    const combinedRef = multipleRef(refFunction, undefined, refObject);
    combinedRef.current = 'testElement';

    expect(refFunction).toHaveBeenCalledWith('testElement');
    expect(refObject.current).toBe('testElement');
  });

  it('should return a RefObject', () => {
    const combinedRef = multipleRef<string>();
    expect(combinedRef).toHaveProperty('current');
  });
});
