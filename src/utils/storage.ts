import type { Analysis } from '../types';

const STORAGE_KEY = 'resumeMatchHistory';

/**
  Retrieves all saved analyses from localStorage
 */
export function getAllAnalyses(): Analysis[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error('Failed to read history from localStorage:', error);
    return [];
  }
}

/**
  Saves a new analysis or updates an existing one in localStorage
 */
export function saveAnalysis(analysis: Analysis): void {
  try {
    const history = getAllAnalyses();
    // Check if item already exists by ID
    const existingIndex = history.findIndex((item) => item.id === analysis.id);
    
    if (existingIndex >= 0) {
      history[existingIndex] = analysis;
    } else {
      // Add to beginning of list (latest first)
      history.unshift(analysis);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('resumeMatchHistoryUpdated'));
    }
  } catch (error) {
    console.error('Failed to save analysis to localStorage:', error);
  }
}

/**
  Retrieves a single analysis by its ID
 */
export function getAnalysisById(id: string): Analysis | null {
  const history = getAllAnalyses();
  return history.find((item) => item.id === id) || null;
}

/**
  Deletes an analysis entry by ID from localStorage
 */
export function deleteAnalysis(id: string): void {
  try {
    const history = getAllAnalyses();
    const filtered = history.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('resumeMatchHistoryUpdated'));
    }
  } catch (error) {
    console.error('Failed to delete analysis from localStorage:', error);
  }
}

/**
  Clears all saved analysis entries from localStorage
 */
export function clearAllAnalyses(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('resumeMatchHistoryUpdated'));
    }
  } catch (error) {
    console.error('Failed to clear history from localStorage:', error);
  }
}

