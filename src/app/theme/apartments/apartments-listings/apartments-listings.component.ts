import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApartmentState, apartmentSelectors, apartmentActions } from '../store';
import { ApartmentListing, IFeatureRecord, IListingsPrices } from '../models/listings';
import { Observable, of, Subject, combineLatest } from 'rxjs';
import { GeoJson, IMapConfigs } from 'ngh-mapbox-gl';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-apartments-listings',
  templateUrl: './apartments-listings.component.html',
  styleUrls: ['./apartments-listings.component.scss']
})
export class ApartmentsListingsComponent implements OnInit, OnDestroy {
  listings: IFeatureRecord[] | null = null;
  geoJsons: GeoJson[] | null = null;
  mapConfigs: IMapConfigs | null = null;
  listingDetail: boolean = false;
  priceRange: IListingsPrices | null = null;
  priceFilterState: boolean = false;
  unsubscribeSignal: Subject<void> = new Subject();
  filterMaxPrice: number | null = null;
  masterPriceRange: Observable<IListingsPrices | null> = this.store.select(apartmentSelectors.selectMasterPriceRange);
  constructor(private store: Store<ApartmentState>) {
    this.store.dispatch(apartmentActions.getListings());
  }

  ngOnInit(): void {
    combineLatest(
      this.store.select(apartmentSelectors.selectDisplayedListings),
      this.store.select(apartmentSelectors.selectDisplayedGeoJson),
      this.store.select(apartmentSelectors.selectMapConfigs),
      this.store.select(apartmentSelectors.selectListingDetail),
      this.store.select(apartmentSelectors.selectPriceRange),
    ).pipe(takeUntil(this.unsubscribeSignal)).subscribe((results: any) => {
      if (results[0]) {
        this.listings = results[0];
      }
      if (results[1]) {
        this.geoJsons = results[1];
      }
      if (results[2]) {
        this.mapConfigs = results[2];
      }
      this.listingDetail = results[3];
      if (results[4]) {
        this.priceRange = results[4];
        this.filterMaxPrice = results[4].min;
      }
    });

    this.store.select(apartmentSelectors.selectPriceFilter).pipe(takeUntil(this.unsubscribeSignal)).subscribe((filter: boolean) => {
      this.priceFilterState = filter;
    });

  }

  onMarkerSelection(markerId: number): void {
    this.store.dispatch(apartmentActions.setListingDetails({ data: markerId }));
  }

  selectedListing(event: IFeatureRecord): void {
    this.store.dispatch(apartmentActions.setListingDetails({ data: event.propertyID }));
  }

  backListView(): void {
    this.store.dispatch(apartmentActions.setListingView());
  }

  toggleFilter(): void {
    this.store.dispatch(apartmentActions.setPriceFilter({ data: !this.priceFilterState }));
  }

  formatLabel(value: number): number {
    return value;
  }

  filterListings(): void {
    if (this.filterMaxPrice) {
      this.toggleFilter();
      this.store.dispatch(apartmentActions.setFilterListings({data: this.filterMaxPrice}));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }

}
