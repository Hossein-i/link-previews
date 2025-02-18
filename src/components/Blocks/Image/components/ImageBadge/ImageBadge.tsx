import styles from './ImageBadge.module.css';

import { Badge, BadgeProps } from '@/components/Blocks/Badge/Badge';
import { classNames } from '@/helpers/classNames';

export interface ImageBadgeProps extends BadgeProps {}

export const ImageBadge = ({
  type,
  className,
  ...restProps
}: ImageBadgeProps) => {
  if (type !== 'number') {
    // eslint-disable-next-line no-console
    console.error('[ImageBadge]: Component supports only type="number"');
    return null;
  }

  return (
    <Badge
      type="number"
      className={classNames(styles.wrapper, className)}
      {...restProps}
    />
  );
};
