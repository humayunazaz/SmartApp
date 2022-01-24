
export interface IGeometry {
  type: string;
  coordinates: number[];
}

export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  id: number;
  properties: number;
}

export interface IMapConfigs {
  centered: number[] | null;
  zoom: number | null;
}

export class GeoJson implements IGeoJson {
  type = 'Feature';
  geometry: IGeometry;
  id: number;
  properties: any;
  constructor(coordinates: number[], id: number) {
    this.geometry = {
      type: 'Point',
      coordinates
    };
    this.id = id;
    this.properties = {
      id: this.id
    }
  }
}

export class FeatureCollection {
  type = 'FeatureCollection';
  constructor(public features: GeoJson[] = []) { }
}

