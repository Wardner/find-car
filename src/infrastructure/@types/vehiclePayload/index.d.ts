declare interface VehiclePayload {
  id?: number;
  brand?: number;
  model?: number;
  plate?: string;
  niv?: string;
  color?: string;
  year?: number;
  lostlocation?: string;
  date?: Date;
  picture?: {
    url: string,
    id: string
  }[];
  description?: string;
  sectorid?: number;
  pub_status?: string;
  user?: number;
}