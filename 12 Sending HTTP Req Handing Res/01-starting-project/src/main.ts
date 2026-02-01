import { bootstrapApplication } from '@angular/platform-browser';
import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { tap } from 'rxjs';

// ?238 Introducing HTTP Interceptors
function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // const request = req.clone({
  //   headers: req.headers.set('X-debug', 'testing'),
  // });
  console.log('[Outgoing Request]');
  console.log(req);
  return (
    next(req)
      // >240 Introducing HTTP Response Interceptors
      .pipe(
        tap({
          next: (evt) => {
            if (evt.type === HttpEventType.Response) {
              console.log('[Incoming Response]');
              console.log(evt.status);
              console.log(evt.body);
            }
          },
        }),
      )
  );
}

bootstrapApplication(AppComponent, {
  // >222 Getting Started with Angular Http Client
  providers: [
    provideHttpClient(
      // ?238 Introducing HTTP Interceptors
      withInterceptors([loggingInterceptor]),
    ),
  ],
}).catch((err) => console.error(err));
