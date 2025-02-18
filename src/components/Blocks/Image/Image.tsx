'use client';

import { ImgHTMLAttributes, isValidElement, ReactNode, useMemo } from 'react';
import styles from './Image.module.css';

import { ImageBadge } from './components';
import { useImageHandlers } from './hooks';

import { getBorderRadius } from '@/components/Blocks/Image/helpers/getBorderRadius';
import { classNames } from '@/helpers/classNames';

export interface ImageProps extends ImgHTMLAttributes<HTMLElement> {
  /** Specifies the width of the image container. */
  width?: number | string;
  /** Specifies the height of the image container. */
  height?: number | string;
  /** Specifies the aspect ratio of the image container (e.g., "16/9"). */
  aspectRatio?: string;
  /** An element (often an icon) displayed when the image fails to load or the `src` attribute is not provided. */
  fallbackIcon?: ReactNode;
  /** Optional children to render within the image component's container. */
  children?: ReactNode;
}

/**
 * Renders an image with optional fallback content. It supports custom sizing and will automatically
 * handle loading states and errors by optionally displaying a fallback icon. This component can also
 * include additional content, such as badges or overlays, as children.
 */
export const Image = ({
  width = '100%',
  height = 'auto',
  aspectRatio,
  className,
  alt,
  crossOrigin,
  decoding,
  loading,
  referrerPolicy,
  sizes,
  src,
  srcSet,
  useMap,
  style,
  fallbackIcon,
  children,
  onError,
  onLoad,
  ...restProps
}: ImageProps) => {
  const { failed, loaded, handleImageError, handleImageLoad } = useImageHandlers({ onError, onLoad });

  const hasSrc = useMemo(() => src || srcSet, [src, srcSet]);
  const needShowFallbackIcon = useMemo(() => (failed || !hasSrc) && isValidElement(fallbackIcon), [failed, hasSrc, fallbackIcon]);

  const containerStyle = useMemo(() => ({
    width,
    height: aspectRatio ? 'auto' : height,
    aspectRatio,
    borderRadius: style?.borderRadius || getBorderRadius(Number(width)),
    ...style,
  }), [width, height, aspectRatio, style]);

  return (
    <div
      style={containerStyle}
      className={classNames(
        styles.wrapper,
        loaded && styles['wrapper--loaded'],
        className,
      )}
      {...restProps}
    >
      {hasSrc && (
        <img
          alt={alt}
          className={styles.image}
          crossOrigin={crossOrigin}
          decoding={decoding}
          loading={loading}
          referrerPolicy={referrerPolicy}
          sizes={sizes}
          src={src}
          srcSet={srcSet}
          useMap={useMap}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      {needShowFallbackIcon && <div className={styles.fallback}>{fallbackIcon}</div>}
      {children}
    </div>
  );
};

Image.Badge = ImageBadge;
