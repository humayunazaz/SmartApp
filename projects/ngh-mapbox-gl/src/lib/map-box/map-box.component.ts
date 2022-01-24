import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NghMapboxGlService } from '../ngh-mapbox-gl.service';
import { GeoJson, FeatureCollection, IMapConfigs } from '../models/map';
import * as mapboxgl from 'mapbox-gl';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'lib-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit, OnChanges, OnDestroy {
  @Input() featureListings: GeoJson[] | null = [];
  @Input() mapConfiguration: IMapConfigs = {centered: null, zoom: 12};
  @Input() customZoom: number = 12;
  @Output() selectedMarkerId: EventEmitter<number> = new EventEmitter<number>();

  /// default settings
  map: any;

  // data
  style: string = 'mapbox://styles/mapbox/outdoors-v9';
  source: any;
  markers: Observable<GeoJson[] | null> = this.mapService.getMarkers();;
  mapConfigs: Observable<IMapConfigs> = this.mapService.getMapConfigs();

  mapStyles: any;
  unsubscribeSignal: Subject<void> = new Subject();

  constructor(private mapService: NghMapboxGlService) { }

  ngOnChanges(): void {
    this.mapService.updateMarkers(this.featureListings);
    if (this.mapConfiguration) {
      this.mapService.updateMapConfigs(this.mapConfiguration);
    }

  }

  ngOnInit(): void {
    this.mapService.getConfigs().maptilerEndpoint !== undefined ? this.initializeMapWithMaptilerStyle(this.mapService.getConfigs().maptilerEndpoint) : this.internalStyleMapInitializer();
  }

  private internalStyleMapInitializer(): void {
    this.mapStyles = this.style;
    this.initializeMap();
  }

  private initializeMapWithMaptilerStyle(endpoint: string | undefined): void {
    if (endpoint !== undefined){
      this.mapService.getMapStyle(endpoint).pipe(take(1)).subscribe((style: any) => {
        this.mapStyles = style;
        this.initializeMap();
      }, (err: any) => {
        this.internalStyleMapInitializer();
      });
    }
  }

  private initializeMap(): void {
    this.buildMap();
  }

  private buildMap(): void {
    // build the map
    this.map = new mapboxgl.Map({
      accessToken: this.mapService.getConfigs().token,
      container: 'map',
      style: this.mapStyles,
    });

    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());


    /// Add listings data on map load
    this.map.on('load', (event: any) => {

      /// register source
      this.map.addSource('customListings', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      /// get source
      this.source = this.map.getSource('customListings');

      /// subscribe to database and set data source
      this.markers.pipe(takeUntil(this.unsubscribeSignal)).subscribe((markers: GeoJson[] | null) => {
        if (markers) {
          const data = new FeatureCollection(markers);
          this.source.setData(data);
        } else {
          console.log('empty');
          this.source.setData(null);
        }
      });

      // jump map to center of pins

      this.mapConfigs.pipe(takeUntil(this.unsubscribeSignal)).subscribe((configs: IMapConfigs) => {
        if (configs.centered) {
          this.map.flyTo({ 'center': configs.centered, 'zoom': configs.zoom });
        }
      });
      /// create map layers with listings data
      this.map.addLayer({
        id: 'customListings',
        source: 'customListings',
        type: 'circle',
        paint: {
          'circle-radius': 16,
          'circle-color': '#B42222'
        },
        filter: ['==', '$type', 'Point']
      });

      // update cursor style on hover
      this.map.on('mouseenter', 'customListings', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });

      this.map.on('mouseleave', 'customListings', () => {
        this.map.getCanvas().style.cursor = '';
      });

      // on click emit id of clicked source
      this.map.on('click', 'customListings', (e: any) => {
        this.selectedMarker(e.features[0].id);
      });

    });

  }


  /// Helpers
  private selectedMarker(markerId: number): void {
    this.selectedMarkerId.emit(markerId);
  }

  ngOnDestroy(): void{
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }

}
