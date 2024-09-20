import { OmitType, PartialType } from '@nestjs/mapped-types';

import { DroughtDto } from './DroughtDto';

export class PatchDroughtFormDto extends PartialType(
  OmitType(DroughtDto, [
    '_id',
    'formhub/uuid',
    'start',
    'end',
    '__version__',
    'meta/instanceID',
    'meta/deprecatedID',
    '_xform_id_string',
    '_uuid',
    '_attachments',
    '_status',
    '_geolocation',
    '_submission_time',
    '_tags',
    '_notes',
    '_validation_status',
    '_submitted_by',
  ] as const),
) {}
