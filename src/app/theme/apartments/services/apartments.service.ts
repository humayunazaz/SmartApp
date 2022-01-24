import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IApartmentListingDTO } from '../models/listings';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {

  constructor(private http: HttpClient) { }

  getApartmentsListings(): Observable<IApartmentListingDTO> {
    return this.http.get<IApartmentListingDTO>('./assets/mock-data/featureListings.json');
  }
}
