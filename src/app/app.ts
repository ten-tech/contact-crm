import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { ThemeService } from './core/services/theme.service';

/**
 * Composant racine de l'application qui initialise le thème et structure la mise en page principale.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Initialize theme service to apply saved theme on startup
  private themeService = inject(ThemeService);
}
