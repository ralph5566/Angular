import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  // >230 More Data Fetching & Some Code Duplication
  // places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  // private httpClient = inject(HttpClient);
  // >231 Outsourcing HTTP Request Logic Into A Service
  private placesService = inject(PlacesService);

  places = this.placesService.loadedUserPlaces;

  private destroyRef = inject(DestroyRef);

  // ?232 Managing HTTP-loaded Data in Service

  ngOnInit() {
    this.isFetching.set(true);

    // >231 Outsourcing HTTP Request Logic Into A Service
    const subscription = this.placesService
      .loadUserPlaces()

      // const subscription = this.httpClient
      // .get<{ places: Place[] }>('http://localhost:3000/user-places')
      // .pipe(
      //   map((resDate) => resDate.places),
      //   catchError((err) => {
      //     console.log(err);
      //     return throwError(() => new Error('Some thing Wrong...'));
      //   })
      // )

      .subscribe({
        // ?232 Managing HTTP-loaded Data in Service
        // next: (places) => {
        //   this.places.set(places);
        // },
        complete: () => {
          this.isFetching.set(false);
        },
        error: (error: Error) => {
          this.error.set(error.message);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  // >237 Sending DELETE Requests
  onRemovePlace(place: Place) {
    const subscription = this.placesService.removeUserPlace(place).subscribe();

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
