import { ApartmentListing, IFeatureRecord, IListingsPrices } from '../models/listings';
import { GeoJson, IMapConfigs } from 'ngh-mapbox-gl';



export interface ApartmentState {
  listings: ApartmentListing | null;
  displayedListings: IFeatureRecord[] | null;
  displayedGeoJson: GeoJson[] | null;
  mapConfigs: IMapConfigs | null;
  selectedListing: boolean;
  priceRange: IListingsPrices | null;
  showPriceFilter: boolean;
  loadingListingsStatus: 'pending' | 'failed' | 'success' | 'loading';
  error?: string;
}

export const apartmentInitialState: ApartmentState = {
  listings: null,
  displayedListings: null,
  displayedGeoJson: null,
  mapConfigs: null,
  selectedListing: false,
  priceRange: null,
  showPriceFilter: false,
  loadingListingsStatus: 'pending'
};
