import React, { memo } from 'react';
import styles from '../Content/Content.module.css';

import { BaseContentProps } from '../Content';
import { DescriptionTypography } from '../DescriptionTypography';

import { Skeleton } from '@/components/Feedback/Skeleton';
import { Divider } from '@/components/Misc';
import { Subheadline } from '@/components/Typography/Subheadline';
import { Text } from '@/components/Typography/Text';
import { classNames } from '@/helpers/classNames';

export interface PlaceholderProps
  extends React.HTMLAttributes<HTMLDivElement>,
  Pick<BaseContentProps, 'displayMode'> { }

export const Placeholder = memo(({
  className,
  displayMode,
  ...restProps
}: PlaceholderProps) => {
  return (
    <div
      className={classNames(
        styles.wrapper,
        displayMode === 'shrink'
          ? styles['wrapper--shrink']
          : styles['wrapper--enlarge'],
        className,
      )}
      {...restProps}
    >
      {' '}
      <Skeleton className={styles.wrapper__image} />
      <div className={styles.wrapper__content}>
        <Skeleton>
          <Text className={styles.content__title} weight="2">
            Title
          </Text>
        </Skeleton>
        <Divider />
        <Skeleton>
          <DescriptionTypography
            className={styles.content__content__description}
          >
            Loading...
          </DescriptionTypography>
        </Skeleton>
        <Skeleton>
          <Subheadline className={styles.content__url} level="2">
            URL
          </Subheadline>
        </Skeleton>
      </div>
    </div>
  );
});
