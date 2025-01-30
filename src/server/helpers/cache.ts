/**
 * Cache entry type
 */
export type CacheEntry<T> = {
  /**
   * Cached value
   */
  value: T;

  /**
   * Expiry time in milliseconds since epoch
   */
  expiry: number;
};

/**
 * A simple cache implementation
 *
 * @type T - Type of the cached value
 */
export class Cache<T> {
  /**
   * Cache map to store cached values
   */
  private cache: Map<string, CacheEntry<T>> = new Map();

  /**
   * Default time-to-live in milliseconds for the cache
   */
  private defaultTTL: number;

  /**
   * Create a new cache instance
   *
   * @param defaultTTL - Default time-to-live in milliseconds for the cache
   */
  constructor(defaultTTL: number = 3.6e6) {
    this.defaultTTL = defaultTTL;
  }

  /**
   * Set a value in the cache
   *
   * @param key - Key to set
   * @param value - Value to set
   * @param ttl - Time-to-live in milliseconds for the cache
   */
  set(key: string, value: T, ttl: number = this.defaultTTL): void {
    const expiry = ttl + Date.now();
    this.cache.set(key, { value, expiry });
  }

  /**
   * Get a value from the cache
   *
   * @param key - Key to get
   *
   * @returns Cached value or null if not found
   */
  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Delete a key from the cache
   *
   * @param key - Key to delete
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get the size of the cache
   *
   * @returns Size of the cache
   */
  size(): number {
    return this.cache.size;
  }
}
