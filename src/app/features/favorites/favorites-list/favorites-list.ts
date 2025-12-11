import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../../core/services/contact.service';
import { CategoryService } from '../../../core/services/category.service';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { Contact } from '../../../core/models/contact.model';

type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';

/**
 * Liste des contacts favoris avec tri dynamique et possibilité de retirer des favoris.
 */
@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './favorites-list.html',
  styleUrl: './favorites-list.scss',
})
export class FavoritesList {
  private contactService = inject(ContactService);
  private categoryService = inject(CategoryService);

  // Signals for reactive state
  sortBy = signal<SortOption>('name-asc');

  // Computed favorite contacts
  favoriteContacts = computed(() => {
    const favorites = this.contactService.getFavoriteContacts();
    return this.contactService.sortContacts(favorites, this.sortBy());
  });

  /**
   * Get initials from contact name
   */
  getInitials(contact: Contact): string {
    return `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase();
  }

  /**
   * Get category name by ID
   */
  getCategoryName(categoryId: string): string {
    return this.categoryService.getCategoryName(categoryId);
  }

  /**
   * Get category color by ID
   */
  getCategoryColor(categoryId: string): string {
    const category = this.categoryService.getCategoryById(categoryId);
    return category ? category.color : '#cccccc';
  }

  /**
   * Toggle favorite status
   */
  toggleFavorite(event: Event, contactId: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.contactService.toggleFavorite(contactId);
  }

  /**
   * Update sort option
   */
  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortBy.set(select.value as SortOption);
  }
}
