import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  translationService = inject(TranslationService);
  currentYear = new Date().getFullYear();
  angularVersion = '20';

  t(key: string): string {
    return this.translationService.translate(key);
  }
}
