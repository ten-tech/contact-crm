import { Injectable, signal, effect } from '@angular/core';
import { StorageService } from './storage.service';

export type Theme = 'light' | 'dark';

/**
 * Service de gestion des thèmes (clair/sombre) avec détection automatique des préférences système.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageService = new StorageService();
  private readonly STORAGE_KEY = 'app_theme';

  // Current theme signal
  private currentThemeSignal = signal<Theme>(this.getInitialTheme());

  // Public computed signal
  currentTheme = this.currentThemeSignal.asReadonly();

  constructor() {
    // Apply theme on init and whenever it changes
    effect(() => {
      this.applyTheme(this.currentThemeSignal());
    });
  }

  /**
   * Get initial theme from storage or system preference
   */
  private getInitialTheme(): Theme {
    const stored = this.storageService.get<Theme>(this.STORAGE_KEY);
    if (stored && (stored === 'light' || stored === 'dark')) {
      return stored;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  /**
   * Set current theme
   */
  setTheme(theme: Theme): void {
    this.currentThemeSignal.set(theme);
    this.storageService.set(this.STORAGE_KEY, theme);
  }

  /**
   * Toggle between themes
   */
  toggleTheme(): void {
    const newTheme: Theme = this.currentThemeSignal() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Apply theme to document
   */
  private applyTheme(theme: Theme): void {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }

  /**
   * Check if current theme is dark
   */
  isDark(): boolean {
    return this.currentThemeSignal() === 'dark';
  }

  /**
   * Check if current theme is light
   */
  isLight(): boolean {
    return this.currentThemeSignal() === 'light';
  }
}
