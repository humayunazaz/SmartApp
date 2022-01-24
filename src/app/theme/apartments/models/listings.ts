import { GeoJson, IMapConfigs } from 'ngh-mapbox-gl';


export interface FloorPlan {
  bedroom: number;
  price: number;
  type: string;
}

export interface IGeoCode {
  Longitude: string;
  Latitude: string;
  Percision: string;
  IsValid: boolean;
}

export interface IFeatureRecord {
  listID?: number;
  order?: number;
  propertyID: number;
  name?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  pets?: boolean;
  washerDry?: string;
  photo?: string;
  favorite?: boolean;
  highestSentCommissions?: number;
  proximity?: number;
  section8?: boolean;
  seniorHousing?: boolean;
  studentHousting?: boolean;
  onsiteManager?: null;
  management?: null;
  floorplans?: FloorPlan[];
  highValueAmenities?: string[];
  paidUtilities?: string[];
  geocode?: IGeoCode;
}
export interface IApartmentListing {
  records: IFeatureRecord[] | any[];
  MapConfigs: IMapConfigs;
  FeatureGeoJson: GeoJson[] | null;
}

export interface IApartmentListingDTO {
  records: IFeatureRecord[];
}

export interface IListingsPrices {
  min: number;
  max: number;
}

export class ApartmentListing implements IApartmentListing {
  MapConfigs: IMapConfigs = { centered: null, zoom: 12 };
  FeatureGeoJson: GeoJson[] | null = null;
  PriceRange: IListingsPrices | null = null;

  private numberAverage(list: number[]): number {
    const average = list.reduce((prev: number, curr: number) => prev + curr) / list.length;
    return average;
  }

  private GetMapCenterCoordinates(langs: number[], lats: number[]): void {
    this.MapConfigs.centered = [this.numberAverage(langs), this.numberAverage(lats)];
  }

  private getFloorPrices(floors: FloorPlan[]): number[] {
    const prices: number[] = [];
    floors.forEach((singleRoom: FloorPlan) => {
      prices.push(singleRoom.price);
    });
    return prices;
  }

  private getMaxMixValues(prices: number[]): void {
    const range: IListingsPrices = {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
    this.PriceRange = range;
  }

  private getFeatureGeoJson(): void {
    const featureGeoJson: GeoJson[] = [];
    const langArray: number[] = [];
    const latArray: number[] = [];
    const prices: number[] = [];
    this.records.forEach((singleRecord: IFeatureRecord) => {
      if (singleRecord.geocode) {
        const singleGeo = new GeoJson([Number(singleRecord.geocode.Longitude), Number(singleRecord.geocode.Latitude)], singleRecord.propertyID);
        featureGeoJson.push(singleGeo);
        langArray.push(Number(singleRecord.geocode.Longitude));
        latArray.push(Number(singleRecord.geocode.Latitude));
        if (singleRecord.floorplans) {
          const price: number[] = this.getFloorPrices(singleRecord.floorplans);
          prices.push(...price);
        }
      }
    });
    this.FeatureGeoJson = featureGeoJson;
    this.GetMapCenterCoordinates(langArray, latArray);
    this.getMaxMixValues(prices);
  }

  constructor(public records: IFeatureRecord[]) {
    if (this.records) {
      this.getFeatureGeoJson();
    }
  }

}
