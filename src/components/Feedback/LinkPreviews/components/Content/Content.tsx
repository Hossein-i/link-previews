import React, { memo } from 'react';
import styles from './Content.module.css';

import { UseLinkPreviewsReturn } from '../../hooks';
import { DescriptionTypography } from '../DescriptionTypography';

import { Image } from '@/components/Blocks';
import { Link } from '@/components/Blocks/Link';
import { Divider } from '@/components/Misc/Divider';
import { Subheadline } from '@/components/Typography/Subheadline';
import { Text } from '@/components/Typography/Text';
import { classNames } from '@/helpers/classNames';

export interface BaseContentProps {
  /**
   *
   */
  metadata: NonNullable<UseLinkPreviewsReturn['metadata']>;

  /**
   * Determines the display mode of the link preview.
   *
   * - 'shrink': Displays a compact version of the link preview.
   * - 'enlarge': Displays an expanded version of the link preview.
   */
  displayMode?: 'shrink' | 'enlarge';
}

export interface ContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseContentProps>,
  BaseContentProps { }

export const Content = memo(
  ({ className, metadata, displayMode, ...restProps }: ContentProps) => {
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
        <Link href={metadata.url} target="_blank" rel="noopener noreferrer">
          <Image
            className={styles.wrapper__image}
            alt={metadata.title}
            src={metadata.image}
            width={displayMode === 'shrink' ? 64 : '100%'}
            aspectRatio={displayMode === 'shrink' ? '1' : '2'}
          />
        </Link>

        <div className={styles.wrapper__content}>
          <Text className={styles.content__title} weight="2">
            <Link href={metadata.url} target="_blank" rel="noopener noreferrer">
              {metadata.title}
            </Link>
          </Text>
          <Divider />
          <DescriptionTypography
            className={styles.content__description}
          >
            {metadata.description}
          </DescriptionTypography>
          <Subheadline className={styles.content__url} level="2">
            <Link
              href={new URL(metadata.url).origin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {new URL(metadata.url).hostname}
            </Link>
          </Subheadline>
        </div>
      </div>
    );
  },
);
