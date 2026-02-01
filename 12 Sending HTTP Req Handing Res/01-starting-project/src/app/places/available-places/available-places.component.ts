import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);

  // ?227 Showing a Loading Fallback
  isFetching = signal(false);

  // >228 Handling HTTP Errors
  error = signal('');

  // >231 Outsourcing HTTP Request Logic Into A Service
  private placesService = inject(PlacesService);

  // >222 Getting Started with Angular Http Client
  // private httpClient = inject(HttpClient);

  // ?224 Sending GET Req To Fetch Data
  private destroyRef = inject(DestroyRef);
  ngOnInit() {
    // ?227 Showing a Loading Fallback
    this.isFetching.set(true);

    // get() GET Req need subscribe()

    // >231 Outsourcing HTTP Request Logic Into A Service
    const subscription = this.placesService
      .loadAvailablePlaces()

      // this.httpClient
      //   .get<{ places: Place[] }>('http://localhost:3000/places', {
      //     // >225 Configuring Http Requests
      //     // observe: 'response',
      //     // observe: 'events',
      //   })
      // // ?226 Transforming & Using Response Data
      // .pipe(
      //   map((resDate) => resDate.places),
      //   // >228 Handling HTTP Errors
      //   catchError((err) => {
      //     console.log(err);
      //     return throwError(() => new Error('Some thing Wrong...'));
      //   })
      // )

      .subscribe({
        next: (places) => {
          // console.log(res);
          // console.log(res.body?.places);

          // ?226 Transforming & Using Response Data
          this.places.set(places);
        },

        // ?227 Showing a Loading Fallback
        complete: () => {
          this.isFetching.set(false);
        },

        // >228 Handling HTTP Errors
        error: (error: Error) => {
          this.error.set(error.message);
          // console.log(err);
          // this.error.set('Some thing Wrong...');
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  // ?229 Sending Data To A Backend
  onSelectPlace(selectedPlace: Place) {
    // // user-places.component

    // >231 Outsourcing HTTP Request Logic Into A Service
    const subscription = this.placesService
      // >233 Implementing Optimistic Updating
      .addPlaceToUserPlaces(selectedPlace)

      // .addPlaceToUserPlaces(selectedPlace.id)

      // this.httpClient
      //   .put('http://localhost:3000/user-places', {
      //     placeId: selectedPlace.id,
      //   })
      .subscribe({
        next: (resData) => console.log(resData),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
