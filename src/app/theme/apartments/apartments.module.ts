import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentsListingsComponent } from './apartments-listings/apartments-listings.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { APARTMENT_FEATURE_NAME } from './store/apartments.selectors';
import { APARTMENT_REDUCERS, APARTMENT_EFFECTS } from './store';
import { EffectsModule } from '@ngrx/effects';
import { NghMapboxGlModule } from 'ngh-mapbox-gl';
import { environment } from '../../../environments/environment';
import { ListingDetailComponent } from './apartments-listings/listing-detail/listing-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: ApartmentsListingsComponent
  }
];

@NgModule({
  declarations: [
    ApartmentsListingsComponent,
    ListingDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    StoreModule.forFeature(APARTMENT_FEATURE_NAME, APARTMENT_REDUCERS),
    EffectsModule.forFeature(APARTMENT_EFFECTS),
    NghMapboxGlModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule
  ]
})
export class ApartmentsModule { }
