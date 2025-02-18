import React, { useContext } from 'react';
import styles from './Body.module.css';

import { LinkPreviewsContext } from '../../contexts/LinkPreviewsContext';
import { BaseContentProps, Content } from '../Content';
import { Fallback, FallbackProps } from '../Fallback';
import { Placeholder, PlaceholderProps } from '../Placeholder';

import { classNames } from '@/helpers/classNames';

export interface BodyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
  Pick<BaseContentProps, 'displayMode'> {
  /**
   * A render prop function that receives the metadata and returns a React node.
   *
   * @param props
   *
   * @returns A React node to be rendered.
   */
  children?: (props: BaseContentProps) => React.ReactNode;

  /**
   * A React node to be displayed while the link preview is loading.
   */
  placeholder?: React.ComponentType<PlaceholderProps>;

  /**
   * A component to be displayed in case of an error, with an error message and a retry function.
   */
  fallback?: React.ComponentType<FallbackProps>;
}

export const Body = ({
  className,
  children = (args) => <Content {...args} />,
  displayMode = 'shrink',
  placeholder: PlaceholderComponent = Placeholder,
  fallback: FallbackComponent = Fallback,
  ...restProps
}: BodyProps) => {
  const { error, loading, metadata, retry } = useContext(LinkPreviewsContext);

  const renderContent = () => {
    if (loading) {
      return <PlaceholderComponent displayMode={displayMode} />;
    }
    if (error || !metadata) {
      return <FallbackComponent error={error ?? ''} onRetry={retry} />;
    }

    return children({ metadata, displayMode });
  };

  return (
    <div className={classNames(styles.wrapper, className)} {...restProps}>
      {renderContent()}
    </div>
  );
};
