import { Stack, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Logo from 'next/image';
import Link from 'next/link';
import React from 'react';

import { colors } from 'theme/muiTheme';

interface NavBarInfoProps {
  shrink: boolean;
}

const NavBarInfo = ({ shrink }: NavBarInfoProps) => {
  const theme = useTheme();

  return (
    <Stack direction="row" gap={theme.spacing(3)}>
      <Link href="/">
        <IconButton sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
          <Logo
            src="/logo.svg"
            alt="logo"
            width={60}
            height={60}
            priority={true} //preloads image
          />
        </IconButton>
      </Link>

      <Link
        href="https://www.wfp.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
          <Logo
            src="/wfp-logo.png"
            alt="logo"
            width={60}
            height={60}
            priority={true} //preloads image
          />
        </IconButton>
      </Link>

      <Stack justifyContent="center">
        <Typography
          variant="subtitle1"
          style={{
            transition: 'color 0.4s',
            color: shrink ? 'white' : 'black',
          }}
        >
          ប្រព័ន្ធព័ត៌មានទាន់ហេតុការណ៍ និងអង្កេតតាមដានស្ថានការណ៍គ្រោះមហន្តរាយ
        </Typography>
        <Typography
          variant="h6"
          style={{
            transition: 'color 0.4s',
            color: shrink ? 'white' : colors.color3,
          }}
        >
          Platform for Real-time Impact and Situation Monitoring
        </Typography>
      </Stack>
    </Stack>
  );
};

export default NavBarInfo;
