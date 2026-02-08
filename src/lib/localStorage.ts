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

/**
 * Clear tasks from localStorage (just  for debugging/resetting)
 */
export function clearTasks(): void {
  try {
    localStorage.removeItem('tasks');
    localStorage.removeItem('localTaskIds');
    console.log(
      ' Tasks cleared from localStorage. Refresh the page to reload from API.',
    );
  } catch (error) {
    console.error('Failed to clear tasks from localStorage:', error);
  }
}

/**
 * Track a task ID as locally created (not on the real API)
 */
export function addLocalTaskId(id: number): void {
  const localIds = getItem<number[]>('localTaskIds') || [];
  if (!localIds.includes(id)) {
    localIds.push(id);
    setItem('localTaskIds', localIds);
  }
}

/**
 * Remove a task ID from local tracking
 */
export function removeLocalTaskId(id: number): void {
  const localIds = getItem<number[]>('localTaskIds') || [];
  const filtered = localIds.filter((localId) => localId !== id);
  setItem('localTaskIds', filtered);
}

/**
 * Check if a task ID is locally created (not on the real API)
 */
export function isLocalTaskId(id: number): boolean {
  const localIds = getItem<number[]>('localTaskIds') || [];
  return localIds.includes(id);
}
