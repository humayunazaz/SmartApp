import { InjectionToken } from '@angular/core';

export const NGH_MAPBOX_TOKEN = new InjectionToken('NGH_MAPBOX_TOKEN');

export interface NGHConfig {
  token: string;
  maptilerEndpoint?: string;
}
