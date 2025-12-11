import { Routes } from '@angular/router';

/**
 * Configuration des routes principales avec chargement différé des modules pour optimiser les performances.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'contacts',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/contacts/contact-list/contact-list').then(m => m.ContactList)
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./features/contacts/contact-form/contact-form').then(m => m.ContactForm)
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/contacts/contact-detail/contact-detail').then(m => m.ContactDetail)
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./features/contacts/contact-form/contact-form').then(m => m.ContactForm)
      }
    ]
  },
  {
    path: 'categories',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/categories/category-list/category-list').then(m => m.CategoryList)
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./features/categories/category-form/category-form').then(m => m.CategoryForm)
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./features/categories/category-form/category-form').then(m => m.CategoryForm)
      }
    ]
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites-list/favorites-list').then(m => m.FavoritesList)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
