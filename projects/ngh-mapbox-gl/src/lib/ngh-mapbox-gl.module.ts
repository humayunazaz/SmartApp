import { NgModule, ModuleWithProviders } from '@angular/core';
import { NghMapboxGlComponent } from './ngh-mapbox-gl.component';
import { MapBoxComponent } from './map-box/map-box.component';
import { NGHConfig, NGH_MAPBOX_TOKEN } from './configs/configs';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NghMapboxGlComponent,
    MapBoxComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    NghMapboxGlComponent,
    MapBoxComponent,
    FormsModule
  ]
})
export class NghMapboxGlModule {

  static forRoot(nghConfigs: NGHConfig): ModuleWithProviders<NghMapboxGlModule> {
    return {
      ngModule: NghMapboxGlModule,
      providers: [
        {
          provide: NGH_MAPBOX_TOKEN,
          useValue: nghConfigs
        }
      ]
    }
  }

}
