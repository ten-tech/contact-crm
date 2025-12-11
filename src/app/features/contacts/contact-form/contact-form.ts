import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../../../core/services/contact.service';
import { CategoryService } from '../../../core/services/category.service';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { ContactFormData } from '../../../core/models/contact.model';

/**
 * Formulaire réactif de création/édition de contact avec validation complète des champs.
 */
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm implements OnInit {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  contactForm!: FormGroup;
  categories = this.categoryService.categories;
  isEditMode = false;
  contactId: string | null = null;
  submitted = false;

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  /**
   * Initialize the reactive form
   */
  private initForm(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
      company: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      favorite: [false],
      notes: ['']
    });
  }

  /**
   * Check if we're in edit mode and load contact data
   */
  private checkEditMode(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');
    if (this.contactId) {
      this.isEditMode = true;
      const contact = this.contactService.getContactById(this.contactId);
      if (contact) {
        this.contactForm.patchValue({
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          company: contact.company,
          jobTitle: contact.jobTitle,
          categoryId: contact.categoryId,
          favorite: contact.favorite,
          notes: contact.notes
        });
      } else {
        // Contact not found, redirect to list
        this.router.navigate(['/contacts']);
      }
    }
  }

  /**
   * Submit form handler
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    const formData: ContactFormData = this.contactForm.value;

    if (this.isEditMode && this.contactId) {
      // Update existing contact
      const updated = this.contactService.updateContact(this.contactId, formData);
      if (updated) {
        this.router.navigate(['/contacts', this.contactId]);
      }
    } else {
      // Create new contact
      const created = this.contactService.createContact(formData);
      this.router.navigate(['/contacts', created.id]);
    }
  }

  /**
   * Cancel and go back
   */
  onCancel(): void {
    if (this.isEditMode && this.contactId) {
      this.router.navigate(['/contacts', this.contactId]);
    } else {
      this.router.navigate(['/contacts']);
    }
  }

  /**
   * Check if field has error
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.touched || this.submitted));
  }

  /**
   * Check if field is invalid
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.touched || this.submitted));
  }

  /**
   * Get error message for field
   */
  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.hasError('required')) {
      return 'This field is required';
    }
    if (field.hasError('minlength')) {
      const minLength = field.errors['minlength'].requiredLength;
      return `Minimum length is ${minLength} characters`;
    }
    if (field.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field.hasError('pattern')) {
      return 'Please enter a valid phone number';
    }

    return '';
  }
}
