export interface DisasterLocation {
  province: string;
  district: string;
}

export interface DisasterPerDate {
  entryDate: string;
  disTyps: string[];
  disTypLocations: Record<string, DisasterLocation[]>;
}
