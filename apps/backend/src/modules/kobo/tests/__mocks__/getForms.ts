/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DroughtQueryResponseDto,
  FloodQueryResponseDto,
  IncidentQueryResponseDto,
} from '@wfp-dmp/interfaces';

import { droughtMock } from './drought';
import { floodMock } from './flood';
import { incidentMock } from './incident';

export const getFormsMock = ({
  disTyps,
  province,
  district,
  commune,
  startDate,
  endDate,
}: {
  disTyps: string[];
  province?: string | string[];
  district?: string | string[];
  commune?: string | string[];
  startDate?: string;
  endDate?: string;
}) => {
  let response;

  switch (disTyps[0]) {
    case '1':
      response = {
        count: 1,
        next: null,
        previous: null,
        results: [floodMock],
      } as FloodQueryResponseDto;
      break;
    case '2':
      response = {
        count: 1,
        next: null,
        previous: null,
        results: [droughtMock],
      } as DroughtQueryResponseDto;
      break;
    default:
      response = {
        count: 1,
        next: null,
        previous: null,
        results: [incidentMock],
      } as IncidentQueryResponseDto;
      break;
  }

  return Promise.resolve(response);
};
