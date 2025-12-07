import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  // >207 Going Zoneless
  providers: [provideExperimentalZonelessChangeDetection()],
}).catch((err) => console.error(err));
