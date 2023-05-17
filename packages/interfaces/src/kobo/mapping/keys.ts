import { DROUGHT, FLOOD, INCIDENT } from '../constants';

export enum KoboCommonKeys {
  district = 'district',
  commune = 'commune',
  province = 'province',
  disasterDate = 'disasterDate',
  entryName = 'entryName',
  phone = 'phone',
  entryDate = 'entryDate',
  disTyp = 'disTyp',
  id = 'id',
  validation_status = 'validation_status',
}

export const koboKeys = {
  [FLOOD]: {
    [KoboCommonKeys.district]: 'g2/District',
    [KoboCommonKeys.commune]: 'g2/Commune',
    [KoboCommonKeys.province]: 'g2/Province',
    [KoboCommonKeys.disasterDate]: 'g2/Date_Dis',
    [KoboCommonKeys.entryName]: 'g1/q_Enum',
    [KoboCommonKeys.phone]: 'g1/q_Phone',
    [KoboCommonKeys.entryDate]: 'g1/Date_report',
    [KoboCommonKeys.disTyp]: 'g2/DisTyp',
    [KoboCommonKeys.id]: '_id',
    [KoboCommonKeys.validation_status]: '_validation_status',
  },
  [DROUGHT]: {
    [KoboCommonKeys.district]: 'group_yu9nq00/District',
    [KoboCommonKeys.commune]: 'group_yu9nq00/Commune',
    [KoboCommonKeys.province]: 'group_yu9nq00/Province',
    [KoboCommonKeys.disasterDate]: 'group_yu9nq00/Date_Dis',
    [KoboCommonKeys.entryName]: 'group_ve4vz14/q_Enum',
    [KoboCommonKeys.phone]: 'group_ve4vz14/q_Phone',
    [KoboCommonKeys.entryDate]: 'group_ve4vz14/Date_report',
    [KoboCommonKeys.disTyp]: 'group_yu9nq00/DisTyp',
    [KoboCommonKeys.id]: '_id',
    [KoboCommonKeys.validation_status]: '_validation_status',
  },
  [INCIDENT]: {
    [KoboCommonKeys.district]: 'G2/District',
    [KoboCommonKeys.commune]: 'G2/Commune',
    [KoboCommonKeys.province]: 'G2/Province',
    [KoboCommonKeys.disasterDate]: 'G2/Date_Dis',
    [KoboCommonKeys.entryName]: 'G1/q_Enum',
    [KoboCommonKeys.phone]: 'G1/q_Phone',
    [KoboCommonKeys.entryDate]: 'G1/Date_report',
    [KoboCommonKeys.disTyp]: 'G2/DisTyp',
    [KoboCommonKeys.id]: '_id',
    [KoboCommonKeys.validation_status]: '_validation_status',
  },
} as const;
