export const FLOOD = 'FLOOD' as const;
export const DROUGHT = 'DROUGHT' as const;
export const INCIDENT = 'INCIDENT' as const;

const floodAssetId = process.env.FLOOD_ASSET_ID;
const droughtAssetId = process.env.DROUGHT_ASSET_ID;
const incidentAssetId = process.env.INCIDENT_ASSET_ID;

if (floodAssetId === undefined) {
  throw new Error('floodAssetId is not defined');
}
if (droughtAssetId === undefined) {
  throw new Error('droughtAssetId is not defined');
}
if (incidentAssetId === undefined) {
  throw new Error('incidentAssetId is not defined');
}

export const AssetId = {
  [FLOOD]: floodAssetId,
  [DROUGHT]: droughtAssetId,
  [INCIDENT]: incidentAssetId,
} as const;

export type DisasterType = typeof FLOOD | typeof DROUGHT | typeof INCIDENT;
