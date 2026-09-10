export interface KoboFieldConstraintDto {
  // Full submission-data path, e.g. 'g3/g3_1/NumVillAff', matching the values in
  // mapping/{flood,drought,incident}.ts and koboKeys
  path: string;
  // Raw XLSForm constraint expression, e.g. '. >= 0'
  constraint: string;
  // User-facing message configured on the Kobo form, e.g. 'please enter value >= 0'
  constraintMessage?: string;
}
