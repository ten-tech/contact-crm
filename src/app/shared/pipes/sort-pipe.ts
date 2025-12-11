import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../../core/models/contact.model';

/**
 * Sort Pipe
 * Sorts array of contacts based on specified criteria
 */
@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {
  transform(items: Contact[], sortBy: string): Contact[] {
    if (!items || !sortBy) {
      return items;
    }

    const sorted = [...items];

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
}
