import { IsDateString, IsOptional } from 'class-validator';

export class GetFloodAffectedVillagesDto {
  @IsDateString() readonly startDate!: string;
  @IsDateString() readonly endDate!: string;
  // Accepted for compatibility with IDPoor's sync-task bookkeeping; not used to filter results.
  // See docs/adr/004-idpoor-flood-village-api.md — filtering is by disaster event date, not
  // submission-modification time.
  @IsOptional() @IsDateString() readonly lastSyncTime?: string;
}

export interface FloodAffectedVillageDto {
  gazetteerCode: string;
  gazetteerLevel: 'village';
  communeCode: string;
  floodAffected: true;
  disasterDate: string;
  submissionId: number;
}
