import { Injectable, signal, computed } from '@angular/core';
import { StorageService } from './storage.service';

export type Language = 'en' | 'fr';

interface Translations {
  [key: string]: string | Translations;
}

/**
 * Service de traduction multi-langues (FR/EN) avec dictionnaires complets et détection de la langue du navigateur.
 */
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private storageService = new StorageService();
  private readonly STORAGE_KEY = 'app_language';

  // Current language signal
  private currentLanguageSignal = signal<Language>(this.getInitialLanguage());

  // Public computed signal
  currentLanguage = computed(() => this.currentLanguageSignal());

  constructor() {}

  /**
   * Get initial language from storage or browser
   */
  private getInitialLanguage(): Language {
    const stored = this.storageService.get<Language>(this.STORAGE_KEY);
    if (stored && (stored === 'en' || stored === 'fr')) {
      return stored;
    }

    // Default to French (or detect from browser)
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('fr') ? 'fr' : 'en';
  }

  /**
   * Set current language
   */
  setLanguage(lang: Language): void {
    this.currentLanguageSignal.set(lang);
    this.storageService.set(this.STORAGE_KEY, lang);
  }

  /**
   * Toggle between languages
   */
  toggleLanguage(): void {
    const newLang: Language = this.currentLanguageSignal() === 'en' ? 'fr' : 'en';
    this.setLanguage(newLang);
  }

  /**
   * Get translation by key
   */
  translate(key: string): string {
    const lang = this.currentLanguageSignal();
    const keys = key.split('.');
    let value: string | Translations = translations[lang];

    for (const k of keys) {
      if (typeof value === 'object' && value !== null) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  }

  /**
   * Alias for translate
   */
  t(key: string): string {
    return this.translate(key);
  }
}

// Translation dictionaries
const translations: Record<Language, Translations> = {
  en: {
    // Header
    header: {
      dashboard: 'Dashboard',
      contacts: 'Contacts',
      categories: 'Categories',
      favorites: 'Favorites'
    },

    // Footer
    footer: {
      copyright: 'Contact CRM - Built with Angular',
      madeWith: 'Made with',
      by: 'by Code2Work Team'
    },

    // Dashboard
    dashboard: {
      title: 'Dashboard',
      totalContacts: 'Total Contacts',
      favorites: 'Favorites',
      categories: 'Categories',
      recentContacts: 'Recent Contacts',
      quickActions: 'Quick Actions',
      addContact: 'Add Contact',
      addCategory: 'Add Category',
      viewAllContacts: 'View All Contacts',
      viewAllCategories: 'View All Categories',
      noRecentContacts: 'No recent contacts',
      startAdding: 'Start by adding your first contact!'
    },

    // Contacts
    contacts: {
      title: 'Contacts',
      add: 'Add Contact',
      edit: 'Edit Contact',
      delete: 'Delete',
      viewDetails: 'View Details',
      search: 'Search contacts...',
      filterByCategory: 'Filter by category',
      sortBy: 'Sort by',
      allCategories: 'All Categories',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company',
      jobTitle: 'Job Title',
      category: 'Category',
      favorite: 'Favorite',
      notes: 'Notes',
      createdAt: 'Created',
      updatedAt: 'Updated',
      noContacts: 'No contacts found',
      noContactsDesc: 'Start by creating your first contact!',
      confirmDelete: 'Are you sure you want to delete',
      sortName: 'Name',
      sortDate: 'Date',
      sortCategory: 'Category',
      contactInfo: 'Contact Information',
      additionalInfo: 'Additional Information',
      save: 'Save',
      cancel: 'Cancel',
      back: 'Back to List',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites'
    },

    // Categories
    categories: {
      title: 'Categories',
      add: 'Add Category',
      edit: 'Edit Category',
      delete: 'Delete',
      viewContacts: 'View Contacts',
      name: 'Name',
      color: 'Color',
      noCategories: 'No categories',
      noCategoriesDesc: 'Create your first category to organize your contacts!',
      contactsCount: 'Contacts',
      confirmDelete: 'Are you sure you want to delete the category',
      cannotDelete: 'Cannot delete this category because it has contacts',
      selectColor: 'Select a color',
      customColor: 'Custom color',
      save: 'Save',
      cancel: 'Cancel'
    },

    // Favorites
    favorites: {
      title: 'Favorite Contacts',
      noFavorites: 'No favorite contacts',
      noFavoritesDesc: 'Mark contacts as favorites to see them here!',
      remove: 'Remove from Favorites'
    },

    // Validation
    validation: {
      required: 'This field is required',
      minLength: 'Minimum length is',
      characters: 'characters',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number'
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success!',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No'
    }
  },

  fr: {
    // Header
    header: {
      dashboard: 'Tableau de bord',
      contacts: 'Contacts',
      categories: 'Catégories',
      favorites: 'Favoris'
    },

    // Footer
    footer: {
      copyright: 'Contact CRM - Conçu avec Angular',
      madeWith: 'Fait avec',
      by: 'par l\'équipe Code2Work'
    },

    // Dashboard
    dashboard: {
      title: 'Tableau de bord',
      totalContacts: 'Total des contacts',
      favorites: 'Favoris',
      categories: 'Catégories',
      recentContacts: 'Contacts récents',
      quickActions: 'Actions rapides',
      addContact: 'Ajouter un contact',
      addCategory: 'Ajouter une catégorie',
      viewAllContacts: 'Voir tous les contacts',
      viewAllCategories: 'Voir toutes les catégories',
      noRecentContacts: 'Aucun contact récent',
      startAdding: 'Commencez par ajouter votre premier contact !'
    },

    // Contacts
    contacts: {
      title: 'Contacts',
      add: 'Ajouter un contact',
      edit: 'Modifier le contact',
      delete: 'Supprimer',
      viewDetails: 'Voir les détails',
      search: 'Rechercher des contacts...',
      filterByCategory: 'Filtrer par catégorie',
      sortBy: 'Trier par',
      allCategories: 'Toutes les catégories',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      company: 'Entreprise',
      jobTitle: 'Poste',
      category: 'Catégorie',
      favorite: 'Favori',
      notes: 'Notes',
      createdAt: 'Créé le',
      updatedAt: 'Modifié le',
      noContacts: 'Aucun contact trouvé',
      noContactsDesc: 'Commencez par créer votre premier contact !',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer',
      sortName: 'Nom',
      sortDate: 'Date',
      sortCategory: 'Catégorie',
      contactInfo: 'Informations de contact',
      additionalInfo: 'Informations supplémentaires',
      save: 'Enregistrer',
      cancel: 'Annuler',
      back: 'Retour à la liste',
      addToFavorites: 'Ajouter aux favoris',
      removeFromFavorites: 'Retirer des favoris'
    },

    // Categories
    categories: {
      title: 'Catégories',
      add: 'Ajouter une catégorie',
      edit: 'Modifier la catégorie',
      delete: 'Supprimer',
      viewContacts: 'Voir les contacts',
      name: 'Nom',
      color: 'Couleur',
      noCategories: 'Aucune catégorie',
      noCategoriesDesc: 'Créez votre première catégorie pour organiser vos contacts !',
      contactsCount: 'Contacts',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer la catégorie',
      cannotDelete: 'Impossible de supprimer cette catégorie car elle contient des contacts',
      selectColor: 'Sélectionnez une couleur',
      customColor: 'Couleur personnalisée',
      save: 'Enregistrer',
      cancel: 'Annuler'
    },

    // Favorites
    favorites: {
      title: 'Contacts favoris',
      noFavorites: 'Aucun contact favori',
      noFavoritesDesc: 'Marquez des contacts comme favoris pour les voir ici !',
      remove: 'Retirer des favoris'
    },

    // Validation
    validation: {
      required: 'Ce champ est requis',
      minLength: 'La longueur minimale est de',
      characters: 'caractères',
      invalidEmail: 'Veuillez entrer une adresse email valide',
      invalidPhone: 'Veuillez entrer un numéro de téléphone valide'
    },

    // Common
    common: {
      loading: 'Chargement...',
      error: 'Une erreur s\'est produite',
      success: 'Succès !',
      confirm: 'Confirmer',
      yes: 'Oui',
      no: 'Non'
    }
  }
};
