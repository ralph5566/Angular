import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import { routes } from './app.routes';

// >268 Enabling Routing & Adding a First Route
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        // ?279 Accessing Parent Route Data From Inside Nested Routes
        paramsInheritanceStrategy: 'always',
      }),
    ),
  ],
};
