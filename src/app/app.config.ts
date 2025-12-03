import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';   // ← IMPORTANTE
import { provideAnimations } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { provideNgxMask } from 'ngx-mask';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),    // ← PROVEEDOR DE HTTP
    provideNgxMask({
      validation: true   // opcional
    }),

    provideRouter(routes),
    // 2. Agrega `FormsModule` a los providers usando `importProvidersFrom`
    // Esto lo hace disponible globalmente.
    FormsModule
  ],
};
