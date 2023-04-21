import { FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';
import { omit } from 'lodash';

export const groupKey = KoboCommonKeys.commune;

export const firstKeys = [KoboCommonKeys.province, KoboCommonKeys.district];

export const sumKeys = Object.values(
  omit(FloodSpecific, [
    FloodSpecific.floodN,
    FloodSpecific.RicePrice,
    FloodSpecific.threat,
    FloodSpecific.other,
  ]),
);

export const countCategoriesKeys = [FloodSpecific.RicePrice];
export const countMultipleChoicesKeys = [FloodSpecific.threat];
