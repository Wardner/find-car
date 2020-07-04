declare interface VehiclePayload {
  brand?: string;
  model?: string;
  plate?: string;
  niv?: string;
  color?: string;
  year?: number;
  lostlocation?: {
    lat: string,
    lon: string
  };
  picture?: string;
  description?: string;
  pub_status?: string;
  user?: number;
}