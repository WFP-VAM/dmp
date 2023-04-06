import { DisasterType, DROUGHT, FLOOD, INCIDENT } from '@wfp-dmp/interfaces';

import { droughtMock } from './drought';
import { floodMock } from './flood';
import { incidentMock } from './incident';

export const getFormMock = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  province: string | undefined,
  disasterType: DisasterType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id: string,
) => {
  let response;

  switch (disasterType) {
    case FLOOD:
      response = floodMock;
      break;
    case DROUGHT:
      response = droughtMock;
      break;
    case INCIDENT:
      response = incidentMock;
      break;
  }

  return Promise.resolve(response);
};
