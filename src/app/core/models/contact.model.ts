/**
 * Contact Model
 * Represents a contact in the CRM system
 */
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  categoryId: string;
  favorite: boolean;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Contact Form Data (for creation/update)
 * Excludes auto-generated fields
 */
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  categoryId: string;
  favorite: boolean;
  notes: string;
}
