/**
 * Category Model
 * Represents a contact category in the CRM system
 */
export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}

/**
 * Category Form Data (for creation/update)
 * Excludes auto-generated fields
 */
export interface CategoryFormData {
  name: string;
  color: string;
}
