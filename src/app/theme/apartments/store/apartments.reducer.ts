import { Action, createReducer, on } from '@ngrx/store';

import * as actions from './apartments.actions';
import { apartmentInitialState } from './apartments.state';
import { IFeatureRecord, IListingsPrices, FloorPlan, ApartmentListing } from '../models/listings';
import { GeoJson, IMapConfigs } from 'ngh-mapbox-gl';

const apartmentsReducer = createReducer(apartmentInitialState,
  on(actions.getListings, (state) => ({ ...state, loadingListingsStatus: 'loading' })),
  on(actions.getListingsSuccess, (state, action) => (
    {
      ...state,
      listings: action.data,
      displayedListings: action.data.records,
      displayedGeoJson: action.data.FeatureGeoJson,
      mapConfigs: action.data.MapConfigs,
      priceRange: action.data.PriceRange,
      loadingListingsStatus: 'success'
    }
  )),
  on(actions.getListingsFailed, (state, action) => ({ ...state, loadingListingsStatus: 'failed', error: action.error })),
  on(actions.setListingDetails, (state, action) => {
    const id: number = action.data;
    let selectedFeatureListing;
    let selectedFeatureGeoJson;
    let mapConfigs: IMapConfigs = { centered: null, zoom: 18 };
    if (state.listings) {
      selectedFeatureListing = state.listings.records.find((x: IFeatureRecord) => x.propertyID === id);
      if (state.listings.FeatureGeoJson) {
        selectedFeatureGeoJson = state.listings.FeatureGeoJson.find((x: GeoJson) => x.id === id);
        if (selectedFeatureGeoJson) {
          mapConfigs.centered = selectedFeatureGeoJson.geometry.coordinates;
        }
      }
    }
    const featureListings: IFeatureRecord[] | null = selectedFeatureListing ? [selectedFeatureListing] : state.displayedListings;
    const featureGeoJson: GeoJson[] | null = selectedFeatureGeoJson ? [selectedFeatureGeoJson] : state.displayedGeoJson;
    const featureMapConfig: IMapConfigs | null = mapConfigs ? mapConfigs : state.mapConfigs;

    return {
      ...state,
      displayedListings: featureListings,
      displayedGeoJson: featureGeoJson,
      mapConfigs: featureMapConfig,
      selectedListing: true
    }
  }),
  on(actions.setListingView, (state, action) => {
    const featureListings: IFeatureRecord[] | null = state.listings ? state.listings.records : null;
    const featureGeoJson: GeoJson[] | null = state.listings ? state.listings.FeatureGeoJson : null;
    const featureMapConfig: IMapConfigs | null = state.listings ? state.listings.MapConfigs : null;

    return {
      ...state,
      selectedListing: false,
      displayedListings: featureListings,
      displayedGeoJson: featureGeoJson,
      mapConfigs: featureMapConfig
    }
  }),
  on(actions.setPriceFilter, (state, action) => ({ ...state, showPriceFilter: action.data })),
  on(actions.setFilterListings, (state, action) => {

    const priceRange: IListingsPrices = {
      min: state.priceRange ? state.priceRange.min : 0,
      max: action.data
    }

    let filterRecords: IFeatureRecord[];
    let filterListings: ApartmentListing | null = null;

    if (state.listings) {
      filterRecords = state.listings.records.filter((record: IFeatureRecord) => {
        const recordFloorMatched: any[] | FloorPlan[] = record.floorplans ? record.floorplans.filter((singleRoom: FloorPlan) => {
          return singleRoom ? singleRoom.price <= action.data : [];
        }) : [];
        return recordFloorMatched.length > 0 ? true : false;
      });
      filterListings = new ApartmentListing(filterRecords);
    }

    const featureListings: IFeatureRecord[] | null = filterListings ? filterListings.records : null;
    const featureGeoJson: GeoJson[] | null = filterListings ? filterListings.FeatureGeoJson : null;
    const featureMapConfig: IMapConfigs | null = filterListings ? filterListings.MapConfigs : null;

    return {
      ...state,
      priceRange: priceRange,
      displayedListings: featureListings,
      displayedGeoJson: featureGeoJson,
      mapConfigs: featureMapConfig
    }
  }),
);

export function reducer(state: any | undefined, action: Action) {
  return apartmentsReducer(state, action);
}
