import { AnchorHTMLAttributes } from 'react';
import styles from './Link.module.css';

import { classNames } from '@/helpers/classNames';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

/**
 * A functional component that renders an anchor (`<a>`) element with additional styles and properties.
 */
export const Link = ({ children, className, ...restProps }: LinkProps) => {
  return (
    <a
      className={classNames(
        styles.link,

        className,
      )}
      {...restProps}
    >
      {children}
    </a>
  );
};
