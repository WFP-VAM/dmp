import {
  DroughtQueryResponseDto,
  FloodQueryResponseDto,
  IncidentQueryResponseDto,
} from '@wfp-dmp/interfaces';

import { droughtMock } from './drought';
import { floodMock } from './flood';
import { incidentMock } from './incident';

export const getFormsMock = (_: string | undefined, disTyp: string) => {
  let response;

  switch (disTyp) {
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
