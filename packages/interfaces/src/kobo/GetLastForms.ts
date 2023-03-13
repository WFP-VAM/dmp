import { DROUGHT, FLOOD, INCIDENT } from './constants';

export default class GetLastFormsDto {
  [FLOOD]!: string;
  [DROUGHT]!: string;
  [INCIDENT]!: string;
}
