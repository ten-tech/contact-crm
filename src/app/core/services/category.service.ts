import { Injectable, signal, computed } from '@angular/core';
import { Category, CategoryFormData } from '../models/category.model';
import { StorageService } from './storage.service';

/**
 * Service de gestion des catégories avec initialisation des catégories par défaut et persistance locale.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly STORAGE_KEY = 'crm_categories';

  // Reactive state using signals
  private categoriesSignal = signal<Category[]>([]);

  // Public computed signals
  categories = this.categoriesSignal.asReadonly();
  categoriesCount = computed(() => this.categoriesSignal().length);

  constructor(private storageService: StorageService) {
    this.loadCategories();
  }

  /**
   * Load categories from localStorage
   */
  private loadCategories(): void {
    const stored = this.storageService.get<Category[]>(this.STORAGE_KEY);
    if (stored && stored.length > 0) {
      // Parse dates back to Date objects
      const categories = stored.map(c => ({
        ...c,
        createdAt: new Date(c.createdAt)
      }));
      this.categoriesSignal.set(categories);
    } else {
      // Initialize with default categories
      this.initializeDefaultCategories();
    }
  }

  /**
   * Initialize default categories
   */
  private initializeDefaultCategories(): void {
    const defaultCategories: Category[] = [
      {
        id: this.generateId(),
        name: 'Student',
        color: '#4CAF50',
        createdAt: new Date()
      },
      {
        id: this.generateId(),
        name: 'Company',
        color: '#2196F3',
        createdAt: new Date()
      },
      {
        id: this.generateId(),
        name: 'Partner',
        color: '#FF9800',
        createdAt: new Date()
      },
      {
        id: this.generateId(),
        name: 'Client',
        color: '#9C27B0',
        createdAt: new Date()
      }
    ];

    this.categoriesSignal.set(defaultCategories);
    this.saveCategories();
  }

  /**
   * Save categories to localStorage
   */
  private saveCategories(): void {
    this.storageService.set(this.STORAGE_KEY, this.categoriesSignal());
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `category_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  /**
   * Get all categories
   */
  getAllCategories(): Category[] {
    return this.categoriesSignal();
  }

  /**
   * Get category by ID
   */
  getCategoryById(id: string): Category | undefined {
    return this.categoriesSignal().find(c => c.id === id);
  }

  /**
   * Get category name by ID
   */
  getCategoryName(id: string): string {
    const category = this.getCategoryById(id);
    return category ? category.name : 'Unknown';
  }

  /**
   * Create a new category
   */
  createCategory(formData: CategoryFormData): Category {
    const newCategory: Category = {
      id: this.generateId(),
      ...formData,
      createdAt: new Date()
    };

    this.categoriesSignal.update(categories => [...categories, newCategory]);
    this.saveCategories();
    return newCategory;
  }

  /**
   * Update an existing category
   */
  updateCategory(id: string, formData: CategoryFormData): Category | null {
    const index = this.categoriesSignal().findIndex(c => c.id === id);
    if (index === -1) {
      return null;
    }

    const updated: Category = {
      ...this.categoriesSignal()[index],
      ...formData
    };

    this.categoriesSignal.update(categories => {
      const newCategories = [...categories];
      newCategories[index] = updated;
      return newCategories;
    });

    this.saveCategories();
    return updated;
  }

  /**
   * Delete a category
   * Note: Should check if category has contacts before deletion
   */
  deleteCategory(id: string): boolean {
    const initialLength = this.categoriesSignal().length;
    this.categoriesSignal.update(categories => categories.filter(c => c.id !== id));

    if (this.categoriesSignal().length < initialLength) {
      this.saveCategories();
      return true;
    }
    return false;
  }

  /**
   * Check if category can be deleted (no contacts associated)
   * This will be implemented in components with ContactService
   */
  canDeleteCategory(id: string, contactCount: number): boolean {
    return contactCount === 0;
  }

  /**
   * Clear all categories (for testing)
   */
  clearAll(): void {
    this.categoriesSignal.set([]);
    this.saveCategories();
  }
}
