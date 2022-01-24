import { ApartmentState } from './apartments.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const APARTMENT_FEATURE_NAME = 'apartmentFeature';

const selectLayout = createFeatureSelector<ApartmentState>(APARTMENT_FEATURE_NAME);
export const selectDisplayedListings = createSelector(selectLayout, (state: ApartmentState) => state.displayedListings);
export const selectDisplayedGeoJson = createSelector(selectLayout, (state: ApartmentState) => state.displayedGeoJson);
export const selectMapConfigs = createSelector(selectLayout, (state: ApartmentState) => state.mapConfigs);
export const selectListingDetail = createSelector(selectLayout, (state: ApartmentState) => state.selectedListing);
export const selectMasterPriceRange = createSelector(selectLayout, (state: ApartmentState) => state.listings? state.listings.PriceRange : state.priceRange);
export const selectPriceRange = createSelector(selectLayout, (state: ApartmentState) => state.priceRange);
export const selectPriceFilter = createSelector(selectLayout, (state: ApartmentState) => state.showPriceFilter);
