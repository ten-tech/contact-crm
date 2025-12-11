import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../../../core/services/contact.service';
import { CategoryService } from '../../../core/services/category.service';
import { Contact } from '../../../core/models/contact.model';

/**
 * Composant de détail d'un contact avec affichage complet et actions (édition, suppression, favoris).
 */
@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.scss',
})
export class ContactDetail implements OnInit {
  private contactService = inject(ContactService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  contact: Contact | undefined;
  contactId: string | null = null;

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');
    if (this.contactId) {
      this.contact = this.contactService.getContactById(this.contactId);
      if (!this.contact) {
        // Contact not found, redirect to list
        this.router.navigate(['/contacts']);
      }
    } else {
      // No ID provided, redirect to list
      this.router.navigate(['/contacts']);
    }
  }

  /**
   * Get initials from contact name
   */
  getInitials(): string {
    if (!this.contact) return '';
    return `${this.contact.firstName.charAt(0)}${this.contact.lastName.charAt(0)}`.toUpperCase();
  }

  /**
   * Get category name by ID
   */
  getCategoryName(): string {
    if (!this.contact) return 'Unknown';
    return this.categoryService.getCategoryName(this.contact.categoryId);
  }

  /**
   * Get category color by ID
   */
  getCategoryColor(): string {
    if (!this.contact) return '#cccccc';
    const category = this.categoryService.getCategoryById(this.contact.categoryId);
    return category ? category.color : '#cccccc';
  }

  /**
   * Toggle favorite status
   */
  toggleFavorite(): void {
    if (this.contact) {
      this.contactService.toggleFavorite(this.contact.id);
      // Update local contact object
      this.contact = this.contactService.getContactById(this.contact.id);
    }
  }

  /**
   * Delete contact with confirmation
   */
  deleteContact(): void {
    if (!this.contact) return;

    const confirmDelete = confirm(
      `Are you sure you want to delete ${this.contact.firstName} ${this.contact.lastName}?`
    );

    if (confirmDelete) {
      const success = this.contactService.deleteContact(this.contact.id);
      if (success) {
        this.router.navigate(['/contacts']);
      }
    }
  }

  /**
   * Navigate to edit page
   */
  editContact(): void {
    if (this.contact) {
      this.router.navigate(['/contacts', this.contact.id, 'edit']);
    }
  }

  /**
   * Navigate back to list
   */
  goBack(): void {
    this.router.navigate(['/contacts']);
  }

  /**
   * Format date for display
   */
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
