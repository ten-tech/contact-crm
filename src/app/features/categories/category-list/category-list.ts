import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../../core/services/contact.service';
import { CategoryService } from '../../../core/services/category.service';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { Category } from '../../../core/models/category.model';

/**
 * Composant de gestion des catégories avec protection contre la suppression si des contacts sont associés.
 */
@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryList {
  private contactService = inject(ContactService);
  private categoryService = inject(CategoryService);

  categories = this.categoryService.categories;

  /**
   * Get contact count for a category
   */
  getContactCount(categoryId: string): number {
    return this.contactService.getContactsByCategory(categoryId).length;
  }

  /**
   * Delete category with confirmation
   */
  deleteCategory(event: Event, category: Category): void {
    event.preventDefault();
    event.stopPropagation();

    const contactCount = this.getContactCount(category.id);

    if (contactCount > 0) {
      alert(`Cannot delete "${category.name}" because it has ${contactCount} contact(s). Please reassign or delete those contacts first.`);
      return;
    }

    const confirmDelete = confirm(`Are you sure you want to delete the category "${category.name}"?`);

    if (confirmDelete) {
      this.categoryService.deleteCategory(category.id);
    }
  }
}
