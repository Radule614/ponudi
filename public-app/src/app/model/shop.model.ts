export interface Location {
  latitude: number;
  longitude: number;
}

export class Shop {
  _id: string;
  name: string;
  location: Location;
  address: string;
  telephoneNumber: string;
  serviceType: string;
  owner?: string;
  shopLevel?: number;
}