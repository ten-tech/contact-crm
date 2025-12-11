import { Injectable, signal, computed } from '@angular/core';
import { Contact, ContactFormData } from '../models/contact.model';
import { StorageService } from './storage.service';

/**
 * Service de gestion des contacts avec opérations CRUD complètes et persistance dans le localStorage.
 */
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly STORAGE_KEY = 'crm_contacts';

  // Reactive state using signals
  private contactsSignal = signal<Contact[]>([]);

  // Public computed signals
  contacts = this.contactsSignal.asReadonly();
  contactsCount = computed(() => this.contactsSignal().length);
  favoritesCount = computed(() => this.contactsSignal().filter(c => c.favorite).length);

  constructor(private storageService: StorageService) {
    this.loadContacts();
  }

  /**
   * Load contacts from localStorage
   */
  private loadContacts(): void {
    const stored = this.storageService.get<Contact[]>(this.STORAGE_KEY);
    if (stored) {
      // Parse dates back to Date objects
      const contacts = stored.map(c => ({
        ...c,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt)
      }));
      this.contactsSignal.set(contacts);
    } else {
      // Initialize with default categories if empty
      this.contactsSignal.set([]);
    }
  }

  /**
   * Save contacts to localStorage
   */
  private saveContacts(): void {
    this.storageService.set(this.STORAGE_KEY, this.contactsSignal());
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `contact_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  /**
   * Get all contacts
   */
  getAllContacts(): Contact[] {
    return this.contactsSignal();
  }

  /**
   * Get contact by ID
   */
  getContactById(id: string): Contact | undefined {
    return this.contactsSignal().find(c => c.id === id);
  }

  /**
   * Get contacts by category
   */
  getContactsByCategory(categoryId: string): Contact[] {
    return this.contactsSignal().filter(c => c.categoryId === categoryId);
  }

  /**
   * Get favorite contacts
   */
  getFavoriteContacts(): Contact[] {
    return this.contactsSignal().filter(c => c.favorite);
  }

  /**
   * Get recent contacts (last 5)
   */
  getRecentContacts(limit: number = 5): Contact[] {
    return [...this.contactsSignal()]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  /**
   * Create a new contact
   */
  createContact(formData: ContactFormData): Contact {
    const now = new Date();
    const newContact: Contact = {
      id: this.generateId(),
      ...formData,
      createdAt: now,
      updatedAt: now
    };

    this.contactsSignal.update(contacts => [...contacts, newContact]);
    this.saveContacts();
    return newContact;
  }

  /**
   * Update an existing contact
   */
  updateContact(id: string, formData: ContactFormData): Contact | null {
    const index = this.contactsSignal().findIndex(c => c.id === id);
    if (index === -1) {
      return null;
    }

    const updated: Contact = {
      ...this.contactsSignal()[index],
      ...formData,
      updatedAt: new Date()
    };

    this.contactsSignal.update(contacts => {
      const newContacts = [...contacts];
      newContacts[index] = updated;
      return newContacts;
    });

    this.saveContacts();
    return updated;
  }

  /**
   * Delete a contact
   */
  deleteContact(id: string): boolean {
    const initialLength = this.contactsSignal().length;
    this.contactsSignal.update(contacts => contacts.filter(c => c.id !== id));

    if (this.contactsSignal().length < initialLength) {
      this.saveContacts();
      return true;
    }
    return false;
  }

  /**
   * Toggle favorite status
   */
  toggleFavorite(id: string): boolean {
    const contact = this.getContactById(id);
    if (!contact) {
      return false;
    }

    this.contactsSignal.update(contacts =>
      contacts.map(c =>
        c.id === id ? { ...c, favorite: !c.favorite, updatedAt: new Date() } : c
      )
    );

    this.saveContacts();
    return true;
  }

  /**
   * Search contacts by query
   */
  searchContacts(query: string): Contact[] {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) {
      return this.getAllContacts();
    }

    return this.contactsSignal().filter(contact =>
      contact.firstName.toLowerCase().includes(lowerQuery) ||
      contact.lastName.toLowerCase().includes(lowerQuery) ||
      contact.email.toLowerCase().includes(lowerQuery) ||
      contact.company.toLowerCase().includes(lowerQuery) ||
      contact.jobTitle.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Sort contacts
   */
  sortContacts(contacts: Contact[], sortBy: 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc'): Contact[] {
    const sorted = [...contacts];

    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) =>
          `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
        );
      case 'name-desc':
        return sorted.sort((a, b) =>
          `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`)
        );
      case 'date-asc':
        return sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      case 'date-desc':
        return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      default:
        return sorted;
    }
  }

  /**
   * Clear all contacts (for testing)
   */
  clearAll(): void {
    this.contactsSignal.set([]);
    this.saveContacts();
  }
}
