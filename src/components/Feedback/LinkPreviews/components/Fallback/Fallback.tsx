import { memo } from 'react';
import styles from './Fallback.module.css';

import { Text } from '@/components/Typography/Text';

export interface FallbackProps {
  /**
   * The error message to display.
   */
  error: string;

  /**
   * The callback function to call when the retry button is clicked.
   */
  onRetry: () => Promise<void>;
}

/**
 * A fallback component for Link Previews that displays an error message and a retry button.
 */
export const Fallback = memo(({ error, onRetry }: FallbackProps) => {
  return (
    <div className={styles.fallback}>
      <Text className={styles.fallback__icon}>⚠️</Text>
      <Text className={styles.fallback__error} weight="2">
        {error}
      </Text>
      <button
        type="button"
        className={styles.fallback__retry}
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
});
