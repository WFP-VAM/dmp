import {
  faBiohazard,
  faBomb,
  faBug,
  faBuildingCircleXmark,
  faCarBurst,
  faCloudBolt,
  faEllipsis,
  faFireFlameSimple,
  faHillRockslide,
  faHouseFloodWater,
  faHurricane,
  faPersonDrowning,
  faSunPlantWilt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DisasterMapping, IncidentMapping } from '@wfp-dmp/interfaces';
import { useIntl } from 'react-intl';

// eslint-disable-next-line complexity
const getIconDefinition = (disTyp: string) => {
  switch (disTyp) {
    case DisasterMapping.flood:
      return faHouseFloodWater;
    case DisasterMapping.drought:
      return faSunPlantWilt;
    case IncidentMapping.hurricane:
      return faHurricane;
    case IncidentMapping.fire:
      return faFireFlameSimple;
    case IncidentMapping.lightning:
      return faCloudBolt;
    case IncidentMapping.epidemics:
      return faBiohazard;
    case IncidentMapping.shorebreak:
      return faHillRockslide;
    case IncidentMapping.insects:
      return faBug;
    case IncidentMapping.traffic_accident:
      return faCarBurst;
    case IncidentMapping.drowning:
      return faPersonDrowning;
    case IncidentMapping.collapse:
      return faBuildingCircleXmark;
    case IncidentMapping.weapon:
      return faBomb;
    default:
      return faEllipsis;
  }
};

export const DisasterIcon = ({ disTyp }: { disTyp: string }): JSX.Element => {
  const intl = useIntl();

  return (
    <FontAwesomeIcon
      icon={getIconDefinition(disTyp)}
      size="2x"
      title={intl.formatMessage({
        id: `disasters.${disTyp}`,
      })}
    />
  );
};
