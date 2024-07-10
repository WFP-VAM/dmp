import { createTheme, ThemeOptions } from '@mui/material';

// TODO: better names?
export const colors = {
  color1: '#9DC2D6',
  color2: '#4BA0B5',
  color3: '#3A84AD',
  color4: '#275D7B',
};

export const muiThemeObject: ThemeOptions = {
  palette: {
    primary: {
      main: colors.color3,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'white',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
  },
};

export const muiTheme = createTheme(muiThemeObject);
