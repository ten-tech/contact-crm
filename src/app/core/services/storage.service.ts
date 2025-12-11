import { Injectable } from '@angular/core';

/**
 * Service de stockage qui encapsule les opérations localStorage avec gestion des erreurs JSON.
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Save data to localStorage
   * @param key Storage key
   * @param data Data to store (will be JSON stringified)
   */
  set<T>(key: string, data: T): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Error saving to localStorage (key: ${key}):', error);
    }
  }

  /**
   * Get data from localStorage
   * @param key Storage key
   * @returns Parsed data or null if not found
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error reading from localStorage (key: ${key}):', error);
      return null;
    }
  }

  /**
   * Remove item from localStorage
   * @param key Storage key
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage (key: ${key}):', error);
    }
  }

  /**
   * Clear all localStorage data
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Check if a key exists in localStorage
   * @param key Storage key
   * @returns True if key exists
   */
  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
