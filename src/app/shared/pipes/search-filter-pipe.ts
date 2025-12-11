import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../../core/models/contact.model';

/**
 * Search Filter Pipe
 * Filters array of contacts based on search query
 */
@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: Contact[], searchQuery: string): Contact[] {
    if (!items || !searchQuery) {
      return items;
    }

    const query = searchQuery.toLowerCase().trim();

    return items.filter(item =>
      item.firstName.toLowerCase().includes(query) ||
      item.lastName.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.company.toLowerCase().includes(query) ||
      item.jobTitle.toLowerCase().includes(query)
    );
  }
}
