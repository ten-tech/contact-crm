import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

/**
 * Point d'entrée de l'application qui bootstrap le composant racine avec la configuration.
 */
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
