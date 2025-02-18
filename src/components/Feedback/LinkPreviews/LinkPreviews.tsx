import { Body, BodyProps, Content, Fallback, Placeholder } from './components';
import { LinkPreviewsContext } from './contexts';
import { useLinkPreviews, UseLinkPreviewsProps } from './hooks';

export interface LinkPreviewsProps extends BodyProps, UseLinkPreviewsProps { }

/**
 * A component that generates a preview for a given URL.
 */
export const LinkPreviews = ({
  children = (args) => <Content {...args} />,
  displayMode = 'shrink',
  placeholder: PlaceholderComponent = Placeholder,
  fallback: FallbackComponent = Fallback,
  url,
  fetcher,
  ...restProps
}: LinkPreviewsProps) => {
  const contextValue = useLinkPreviews({ url, fetcher });

  return (
    <LinkPreviewsContext.Provider value={contextValue}>
      <Body
        displayMode={displayMode}
        placeholder={PlaceholderComponent}
        fallback={FallbackComponent}
        {...restProps}
      >
        {(args) => children(args)}
      </Body>
    </LinkPreviewsContext.Provider>
  );
};
