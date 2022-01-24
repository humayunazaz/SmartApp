import { createAction, props } from '@ngrx/store';
import { ApartmentListing } from '../models/listings';

export const getListings = createAction('[Apartments] Get Apartment Listings');
export const getListingsSuccess = createAction('[Apartments] Get Apartment Listings Success', props<{ data: ApartmentListing }>());
export const getListingsFailed = createAction('[Apartments] Get Apartment Listings Failed', props<{ error: string }>());

export const setListingDetails = createAction('[Apartments] Set Single Listing Detail', props<{ data: number }>());
export const setListingView = createAction('[Apartments] Set Listing view');
export const setPriceFilter = createAction('[Apartments] Set Price Filter', props<{ data: boolean }>());

export const setFilterListings = createAction('[Apartments] Filter Listings with Max Price', props<{ data: number }>());
