import { Pipe, PipeTransform, inject, ChangeDetectorRef, OnDestroy, EffectRef } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { effect } from '@angular/core';

/**
 * Pipe de traduction qui se met à jour automatiquement lors du changement de langue.
 */
@Pipe({
  name: 'translate',
  standalone: true,
  pure: false // Required to update when language changes
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private translationService = inject(TranslationService);
  private cdr = inject(ChangeDetectorRef);
  private effectRef: EffectRef;

  constructor() {
    // Subscribe to language changes
    this.effectRef = effect(() => {
      // Trigger change detection when language changes
      this.translationService.currentLanguage();
      this.cdr.markForCheck();
    });
  }

  transform(key: string): string {
    return this.translationService.translate(key);
  }

  ngOnDestroy(): void {
    this.effectRef.destroy();
  }
}
