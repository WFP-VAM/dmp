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

  const imageTransition = shrink ? '40px' : '60px';
  const textTransition = shrink ? 0 : 'inherit';

  return (
    <Stack direction="row" gap={theme.spacing(3)}>
      <Stack
        direction="row"
        style={{
          transition: '0.4s',
          gap: shrink ? theme.spacing(1) : theme.spacing(2),
        }}
      >
        <Link href="/">
          <IconButton
            sx={{ '&:hover': { backgroundColor: 'transparent' } }}
            style={{ padding: 0 }}
          >
            <Logo
              style={{
                transition: '0.4s',
                width: imageTransition,
                height: imageTransition,
              }}
              width={0}
              height={0}
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
            sx={{ '&:hover': { backgroundColor: 'transparent' } }}
            style={{ padding: 0 }}
          >
            <Logo
              style={{
                transition: '0.4s',
                width: imageTransition,
                height: imageTransition,
              }}
              width={0}
              height={0}
              src="/wfp-logo.png"
              alt="logo"
              priority={true} //preloads image
            />
          </IconButton>
        </Link>
      </Stack>

      <Stack justifyContent="center">
        <Typography
          variant="subtitle1"
          style={{
            color: 'black',
            transition: 'all 0.4s',
            opacity: textTransition,
            fontSize: textTransition,
          }}
        >
          ប្រព័ន្ធព័ត៌មានទាន់ហេតុការណ៍ និងអង្កេតតាមដានស្ថានការណ៍គ្រោះមហន្តរាយ
        </Typography>
        <Typography
          variant="h6"
          style={{
            color: colors.color3,
            transition: 'all 0.4s',
            opacity: textTransition,
            fontSize: textTransition,
          }}
        >
          Disaster Information and Monitoring System
        </Typography>
      </Stack>
    </Stack>
  );
};

export default NavBarInfo;
