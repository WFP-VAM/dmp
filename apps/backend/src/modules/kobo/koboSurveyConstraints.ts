import { HttpService } from '@nestjs/axios';
import { KoboFieldConstraintDto } from '@wfp-dmp/interfaces';

// Shape of a single row in a Kobo asset's `content.survey` array, trimmed to the
// fields we care about. Kobo groups (`begin_group`/`end_group`) nest questions;
// the flattened `group1/group2/question_name` path is exactly what's used as the
// key in submission data (see koboKeys/floodSpecificKeys etc.), so we reconstruct
// it the same way here.
interface KoboSurveyRow {
  type: string;
  name?: string;
  constraint?: string;
  constraint_message?: string;
}

// Shape of the `GET assets/{id}.json` response, trimmed to what we need.
export interface KoboAssetSchemaResponse {
  content?: { survey?: KoboSurveyRow[] };
}

const isGroupStart = (type: string): boolean => type === 'begin_group' || type === 'begin_repeat';
const isGroupEnd = (type: string): boolean => type === 'end_group' || type === 'end_repeat';

// Flattens a Kobo asset's `content.survey` array into the list of fields that
// declare a constraint, keyed by their full submission-data path.
export const flattenSurveyConstraints = (
  survey: KoboSurveyRow[] | undefined,
): KoboFieldConstraintDto[] => {
  if (survey === undefined) return [];

  const groupStack: string[] = [];
  const constraints: KoboFieldConstraintDto[] = [];

  for (const row of survey) {
    if (isGroupStart(row.type)) {
      if (row.name !== undefined) {
        groupStack.push(row.name);
      }
      continue;
    }

    if (isGroupEnd(row.type)) {
      groupStack.pop();
      continue;
    }

    if (row.constraint === undefined || row.name === undefined) {
      continue;
    }

    const path = [...groupStack, row.name].join('/');

    constraints.push({
      path,
      constraint: row.constraint,
      constraintMessage: row.constraint_message,
    });
  }

  return constraints;
};

// Fetches an asset's schema from Kobo and flattens its constrained fields.
export const fetchFormConstraints = async (
  httpService: HttpService,
  assetId: string,
): Promise<KoboFieldConstraintDto[]> => {
  const { data } = await httpService.axiosRef.get<KoboAssetSchemaResponse>(
    `assets/${assetId}.json`,
  );

  return flattenSurveyConstraints(data.content?.survey);
};
