export interface DisasterLocation {
  province: string;
  district: string;
}

export interface DisasterPerDate {
  disasterDate: string;
  disTyps: string[];
  disTypLocations: Record<string, DisasterLocation[]>;
}
