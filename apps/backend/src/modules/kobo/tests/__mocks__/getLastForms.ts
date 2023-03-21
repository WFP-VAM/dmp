import {
  DisasterType,
  DROUGHT,
  DroughtQueryResponseDto,
  FLOOD,
  FloodQueryResponseDto,
  INCIDENT,
  IncidentQueryResponseDto,
} from '@wfp-dmp/interfaces';

import { droughtMock } from './drought';
import { floodMock } from './flood';
import { incidentMock } from './incident';

export const getLastFormsMock = (_: number, disasterType: DisasterType) => {
  let response;

  switch (disasterType) {
    case FLOOD:
      response = {
        count: 1,
        next: null,
        previous: null,
        results: [floodMock],
      } as FloodQueryResponseDto;
      break;
    case DROUGHT:
      response = {
        count: 1,
        next: null,
        previous: null,
        results: [droughtMock],
      } as DroughtQueryResponseDto;
      break;
    case INCIDENT:
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
