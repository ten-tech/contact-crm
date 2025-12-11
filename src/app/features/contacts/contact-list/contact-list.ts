import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { CategoryService } from '../../../core/services/category.service';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { Contact } from '../../../core/models/contact.model';

type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';

/**
 * Composant de liste des contacts avec filtres avancés (recherche, catégorie, favoris) et tri dynamique.
 */
@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList implements OnInit {
  private contactService = inject(ContactService);
  private categoryService = inject(CategoryService);
  translationService = inject(TranslationService);

  // Signals for reactive state
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('all');
  showFavoritesOnly = signal<boolean>(false);
  sortBy = signal<SortOption>('name-asc');

  // Get all contacts and categories
  allContacts = this.contactService.contacts;
  categories = this.categoryService.categories;

  // Computed filtered and sorted contacts
  filteredContacts = computed(() => {
    let contacts = this.contactService.getAllContacts();

    // Apply search filter
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      contacts = contacts.filter(contact =>
        contact.firstName.toLowerCase().includes(query) ||
        contact.lastName.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.company.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    const category = this.selectedCategory();
    if (category !== 'all') {
      contacts = contacts.filter(contact => contact.categoryId === category);
    }

    // Apply favorites filter
    if (this.showFavoritesOnly()) {
      contacts = contacts.filter(contact => contact.favorite);
    }

    // Apply sorting
    return this.contactService.sortContacts(contacts, this.sortBy());
  });

  ngOnInit(): void {
    // Initialization if needed
  }

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
   * Update search query
   */
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  /**
   * Update category filter
   */
  onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedCategory.set(select.value);
  }

  /**
   * Update sort option
   */
  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortBy.set(select.value as SortOption);
  }

  /**
   * Toggle favorites filter
   */
  toggleFavoritesFilter(): void {
    this.showFavoritesOnly.set(!this.showFavoritesOnly());
  }
}
