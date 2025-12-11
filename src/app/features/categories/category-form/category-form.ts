import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { CategoryFormData } from '../../../core/models/category.model';

/**
 * Formulaire de création/édition de catégorie avec sélecteur de couleurs prédéfinies.
 */
@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss',
})
export class CategoryForm implements OnInit {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  categoryForm!: FormGroup;
  isEditMode = false;
  categoryId: string | null = null;
  submitted = false;

  // Predefined color options
  colorOptions = [
    '#4CAF50', // Green
    '#2196F3', // Blue
    '#FF9800', // Orange
    '#9C27B0', // Purple
    '#F44336', // Red
    '#00BCD4', // Cyan
    '#FFEB3B', // Yellow
    '#795548', // Brown
    '#607D8B', // Blue Grey
    '#E91E63', // Pink
    '#3F51B5', // Indigo
    '#009688', // Teal
  ];

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  /**
   * Initialize the reactive form
   */
  private initForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      color: ['#4CAF50', [Validators.required]]
    });
  }

  /**
   * Check if we're in edit mode and load category data
   */
  private checkEditMode(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.isEditMode = true;
      const category = this.categoryService.getCategoryById(this.categoryId);
      if (category) {
        this.categoryForm.patchValue({
          name: category.name,
          color: category.color
        });
      } else {
        // Category not found, redirect to list
        this.router.navigate(['/categories']);
      }
    }
  }

  /**
   * Submit form handler
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.categoryForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.categoryForm.controls).forEach(key => {
        this.categoryForm.get(key)?.markAsTouched();
      });
      return;
    }

    const formData: CategoryFormData = this.categoryForm.value;

    if (this.isEditMode && this.categoryId) {
      // Update existing category
      const updated = this.categoryService.updateCategory(this.categoryId, formData);
      if (updated) {
        this.router.navigate(['/categories']);
      }
    } else {
      // Create new category
      this.categoryService.createCategory(formData);
      this.router.navigate(['/categories']);
    }
  }

  /**
   * Cancel and go back
   */
  onCancel(): void {
    this.router.navigate(['/categories']);
  }

  /**
   * Select a color
   */
  selectColor(color: string): void {
    this.categoryForm.patchValue({ color });
  }

  /**
   * Check if field has error
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.categoryForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.touched || this.submitted));
  }

  /**
   * Check if field is invalid
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.categoryForm.get(fieldName);
    return !!(field && field.invalid && (field.touched || this.submitted));
  }

  /**
   * Get error message for field
   */
  getErrorMessage(fieldName: string): string {
    const field = this.categoryForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.hasError('required')) {
      return 'This field is required';
    }
    if (field.hasError('minlength')) {
      const minLength = field.errors['minlength'].requiredLength;
      return `Minimum length is ${minLength} characters`;
    }

    return '';
  }
}
