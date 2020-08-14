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
  picture?: string[];
  description?: string;
  pub_status?: string;
  user?: number;
}