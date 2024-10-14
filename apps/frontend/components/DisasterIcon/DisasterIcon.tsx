import { SvgIcon } from '@mui/material';
import { DisasterMapping, IncidentMapping } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import Attack from 'assets/icons/Attack.svg';
import BuildingFacilityDestroyed from 'assets/icons/Building-facility-destroyed.svg';
import Car from 'assets/icons/Car.svg';
import Cyclone from 'assets/icons/Cyclone.svg';
import Drought from 'assets/icons/Drought.svg';
import Drowned from 'assets/icons/Drowned.svg';
import Epidemic from 'assets/icons/Epidemic.svg';
import Fire from 'assets/icons/Fire.svg';
import Flood from 'assets/icons/Flood.svg';
import Insect from 'assets/icons/Insect-infestation.svg';
import Landslide from 'assets/icons/Landslide-mudslide.svg';
import MoreOptions from 'assets/icons/More-options.svg';
import Storm from 'assets/icons/Storm.svg';

// eslint-disable-next-line complexity
const getIconDefinition = (disTyp: string) => {
  switch (disTyp) {
    case DisasterMapping.flood:
      return <Flood />;
    case DisasterMapping.drought:
      return <Drought />;
    case IncidentMapping.hurricane:
      return <Cyclone />;
    case IncidentMapping.fire:
      return <Fire />;
    case IncidentMapping.lightning:
      return <Storm />;
    case IncidentMapping.epidemics:
      return <Epidemic />;
    case IncidentMapping.shorebreak:
      return <Landslide />;
    case IncidentMapping.insects:
      return <Insect />;
    case IncidentMapping.traffic_accident:
      return <Car />;
    case IncidentMapping.drowning:
      return <Drowned />;
    case IncidentMapping.collapse:
      return <BuildingFacilityDestroyed />;
    case IncidentMapping.weapon:
      return <Attack />;
    default:
      return <MoreOptions style={{ transform: [{ rotate: '90deg' }] }} />;
  }
};

export const DisasterIcon = ({ disTyp }: { disTyp: string }): JSX.Element => {
  const iconDefinition = useMemo(() => getIconDefinition(disTyp), [disTyp]);

  return <SvgIcon>{iconDefinition}</SvgIcon>;
};
