import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../core/services/contact.service';
import { CategoryService } from '../../core/services/category.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { Contact } from '../../core/models/contact.model';

/**
 * Tableau de bord affichant les statistiques globales et les contacts récents avec actions rapides.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  // Inject services using inject() function
  private contactService = inject(ContactService);
  private categoryService = inject(CategoryService);

  // Statistics computed from signals
  totalContacts = this.contactService.contactsCount;
  totalFavorites = this.contactService.favoritesCount;
  totalCategories = this.categoryService.categoriesCount;

  recentContacts: Contact[] = [];

  ngOnInit(): void {
    this.recentContacts = this.contactService.getRecentContacts(5);
  }

  getInitials(contact: Contact): string {
    return `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase();
  }

  getCategoryName(categoryId: string): string {
    return this.categoryService.getCategoryName(categoryId);
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categoryService.getCategoryById(categoryId);
    return category ? category.color : '#cccccc';
  }
}
