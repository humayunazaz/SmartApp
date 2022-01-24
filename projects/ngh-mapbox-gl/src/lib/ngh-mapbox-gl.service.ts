import { Injectable, Inject } from '@angular/core';
import { NGH_MAPBOX_TOKEN, NGHConfig } from './configs/configs';

import { GeoJson, IMapConfigs } from './models/map';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NghMapboxGlService {
  markersObserv: BehaviorSubject<GeoJson[] | null> = new BehaviorSubject<GeoJson[] | null>(null);
  mapConfigs: BehaviorSubject<IMapConfigs> = new BehaviorSubject<IMapConfigs>({centered: null, zoom: 12});
  selectedMarker: BehaviorSubject<GeoJson[] | null> = new BehaviorSubject<GeoJson[] | null>(null);


  constructor(
    @Inject(NGH_MAPBOX_TOKEN) private nghConfigs: NGHConfig,
    private httpClient: HttpClient
  ) {
  }

  getConfigs(): NGHConfig {
    return this.nghConfigs;
  }

  getMapStyle(endpoint: string): Observable<any> {
    return this.httpClient.get(endpoint);
  }

  getMarkers(): Observable<GeoJson[] | null> {
    return this.markersObserv;
  }

  getMapConfigs(): Observable<IMapConfigs> {
    return this.mapConfigs;
  }

  updateMarkers(data: GeoJson[] | null): void {
    this.markersObserv.next(data);
  }

  updateMapConfigs(configs: IMapConfigs): void{
    this.mapConfigs.next(configs);
  }

}
