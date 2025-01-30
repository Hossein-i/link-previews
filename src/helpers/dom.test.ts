import {
  canUseDOM,
  getHTMLElementByChildren,
  getHTMLElementSiblingByDirection,
} from './dom';

describe('DOM Helpers', () => {
  describe('canUseDOM', () => {
    it('should return true if DOM is available', () => {
      expect(canUseDOM).toBe(true);
    });
  });

  describe('getHTMLElementByChildren', () => {
    it('should return the correct HTML element by index', () => {
      const div = document.createElement('div');
      const child1 = document.createElement('span');
      const child2 = document.createElement('p');
      div.appendChild(child1);
      div.appendChild(child2);

      expect(getHTMLElementByChildren(div.children, 1)).toBe(child2);
    });

    it('should return null if the element at the index is not valid', () => {
      const div = document.createElement('div');
      const child1 = document.createTextNode('text');
      div.appendChild(child1);

      expect(getHTMLElementByChildren(div.children, 0)).toBeNull();
    });
  });

  describe('getHTMLElementSiblingByDirection', () => {
    it('should return the correct sibling element to the left', () => {
      const div = document.createElement('div');
      const child1 = document.createElement('span');
      const child2 = document.createElement('p');
      div.appendChild(child1);
      div.appendChild(child2);

      expect(getHTMLElementSiblingByDirection(child2, 'left')).toBe(child1);
    });

    it('should return the correct sibling element to the right', () => {
      const div = document.createElement('div');
      const child1 = document.createElement('span');
      const child2 = document.createElement('p');
      div.appendChild(child1);
      div.appendChild(child2);

      expect(getHTMLElementSiblingByDirection(child1, 'right')).toBe(child2);
    });

    it('should return null if there is no sibling in the given direction', () => {
      const div = document.createElement('div');
      const child1 = document.createElement('span');
      div.appendChild(child1);

      expect(getHTMLElementSiblingByDirection(child1, 'left')).toBeNull();
      expect(getHTMLElementSiblingByDirection(child1, 'right')).toBeNull();
    });
  });
});
