/**
 * Generic localStorage utility with error handling
 */

/**
 * Get an item from localStorage
 */
export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Failed to get item "${key}" from localStorage:`, error);
    return null;
  }
}

/**
 * Set an item in localStorage
 */
export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set item "${key}" in localStorage:`, error);
  }
}

/**
 * Remove an item from localStorage
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove item "${key}" from localStorage:`, error);
  }
}

/**
 * Clear all items from localStorage
 */
export function clearAll(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}

/**
 * Check if a key exists in localStorage
 */
export function hasItem(key: string): boolean {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`Failed to check item "${key}" in localStorage:`, error);
    return false;
  }
}
