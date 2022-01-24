import { Injectable } from '@angular/core';


import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { apartmentActions } from '.';
import { ApartmentsService } from '../services/apartments.service';
import { of } from 'rxjs';
import { ApartmentListing, IApartmentListingDTO } from '../models/listings';


@Injectable({ providedIn: 'root' })
export class ApartmentEffects {
  constructor(private actions$: Actions, private apartmentService: ApartmentsService) { }

  getListings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apartmentActions.getListings),
      switchMap((data) => {
        return this.apartmentService.getApartmentsListings().pipe(
          map((listings: IApartmentListingDTO) => {
            const apartmentListing: ApartmentListing = new ApartmentListing(listings.records);
            return apartmentActions.getListingsSuccess({ data: apartmentListing })
          }),
          catchError(error => of(apartmentActions.getListingsFailed({ error: error })))
        )
      })
    )
  })
}
