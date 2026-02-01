import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Place } from './place.model';
import { ErrorService } from '../shared/shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  // ?236 Implementing App-wide Error Management
  private ErrorService = inject(ErrorService);

  // >231 Outsourcing HTTP Request Logic Into A Service
  private httpClient = inject(HttpClient);

  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    // >231 Outsourcing HTTP Request Logic Into A Service
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went Wrong...',
    );
  }

  loadUserPlaces() {
    // >231 Outsourcing HTTP Request Logic Into A Service
    return (
      this.fetchPlaces(
        'http://localhost:3000/user-places',
        'Something went Wrong...',
      )
        // ?232 Managing HTTP-loaded Data in Service
        .pipe(
          tap({
            next: (userPlaces) => this.userPlaces.set(userPlaces),
          }),
        )
    );
  }

  // >233 Implementing Optimistic Updating
  addPlaceToUserPlaces(place: Place) {
    // ?235 Improved Optimistic Updating
    const prevPlaces = this.userPlaces();
    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    // this.userPlaces.update((prevPlaces) => [...prevPlaces, place]);

    // addPlaceToUserPlaces(placeId: string) {
    // >231 Outsourcing HTTP Request Logic Into A Service
    return (
      this.httpClient
        .put('http://localhost:3000/user-places', {
          // placeId,

          // >233 Implementing Optimistic Updating
          placeId: place.id,
        })
        // ?235 Improved Optimistic Updating
        .pipe(
          catchError((err) => {
            this.userPlaces.set(prevPlaces);

            // ?236 Implementing App-wide Error Management
            this.ErrorService.showError('Failed to store selected place');

            return throwError(
              () => new Error('Failed to store selected place'),
            );
          }),
        )
    );
  }

  removeUserPlace(place: Place) {
    // >237 Sending DELETE Requests
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }

    return this.httpClient
      .delete(`http://localhost:3000/user-places/${place.id}`)
      .pipe(
        catchError((err) => {
          this.userPlaces.set(prevPlaces);
          this.ErrorService.showError('Failed to remove selected place');
          return throwError(() => new Error('Failed to remove selected place'));
        }),
      );
  }

  // >231 Outsourcing HTTP Request Logic Into A Service
  private fetchPlaces(url: string, errMsg: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resDate) => resDate.places),
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error(errMsg));
      }),
    );
  }
}
