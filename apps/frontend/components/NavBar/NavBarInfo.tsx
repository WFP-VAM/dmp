import { Stack, useMediaQuery, useTheme } from '@mui/material';
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
  const isSmallScreen = useMediaQuery('(max-width:1000px)');

  const logoSize = shrink ? 40 : 60;
  const textSize = shrink ? 0 : '16px';
  const logoStyle = {
    transition: '0.4s',
    width: logoSize,
    height: logoSize,
    maxWidth: 'none',
    objectFit: 'contain' as const,
  };

  return (
    <Stack
      direction="row"
      gap={theme.spacing(3)}
      minWidth={0}
      alignItems="center"
    >
      <Stack
        direction="row"
        flexShrink={0}
        style={{
          transition: '0.4s',
          gap: shrink ? theme.spacing(1) : theme.spacing(2),
        }}
      >
        <Link href="/">
          <IconButton
            sx={{
              '&:hover': { backgroundColor: 'transparent' },
              flexShrink: 0,
              p: 0,
            }}
          >
            <Logo
              style={logoStyle}
              width={60}
              height={60}
              src="/logo.svg"
              alt="logo"
              priority={true} //preloads image
            />
          </IconButton>
        </Link>

        <Link
          href="https://www.wfp.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton
            sx={{
              '&:hover': { backgroundColor: 'transparent' },
              flexShrink: 0,
              p: 0,
            }}
          >
            <Logo
              style={logoStyle}
              width={60}
              height={60}
              src="/wfp-logo.png"
              alt="WFP"
              priority={true} //preloads image
            />
          </IconButton>
        </Link>
      </Stack>

      {!isSmallScreen && (
        <Stack justifyContent="center" minWidth={0} overflow="hidden">
          <Typography
            variant="subtitle1"
            noWrap
            style={{
              color: 'black',
              transition: 'all 0.4s',
              opacity: textSize === 0 ? 0 : 1,
              fontSize: textSize,
            }}
          >
            ប្រព័ន្ធព័ត៌មានទាន់ហេតុការណ៍ និងអង្កេតតាមដានស្ថានការណ៍គ្រោះមហន្តរាយ
          </Typography>
          <Typography
            variant="h6"
            noWrap
            style={{
              color: colors.color3,
              transition: 'all 0.4s',
              opacity: textSize === 0 ? 0 : 1,
              fontSize: textSize,
            }}
          >
            Disaster Information and Monitoring System
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default NavBarInfo;
