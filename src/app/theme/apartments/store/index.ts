import { reducer } from './apartments.reducer';
import { ApartmentEffects } from './apartments.effects';

import * as act from './apartments.actions';
import * as sel from './apartments.selectors';

export * from './apartments.state';

export const APARTMENT_REDUCERS = reducer;

export const APARTMENT_EFFECTS = [ApartmentEffects];
export const apartmentActions = act;
export const apartmentSelectors = sel;
