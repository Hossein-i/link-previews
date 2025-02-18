import {
  ImgHTMLAttributes,
  SyntheticEvent,
  useCallback,
  useState,
} from 'react';

export interface UseImageHandlersProps
  extends Pick<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {}

export const useImageHandlers = ({
  onError,
  onLoad,
}: UseImageHandlersProps) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleImageLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      if (loaded) {
        return;
      }
      setLoaded(true);
      setFailed(false);
      onLoad?.(event);
    },
    [loaded, onLoad],
  );

  const handleImageError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setLoaded(false);
      setFailed(true);
      onError?.(event);
    },
    [onError],
  );

  return { loaded, failed, handleImageLoad, handleImageError };
};

export type UseImageHandlersReturn = ReturnType<typeof useImageHandlers>;
