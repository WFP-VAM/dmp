import { createTheme, ThemeOptions } from '@mui/material';

// TODO: better names?
export const colors = {
  color1: '#9DC2D6',
  color2: '#4BA0B5',
  color3: '#3A84AD',
  color4: '#275D7B',
  color5: '#63B2BD',
  color6: '#91c9d0',
  gray: '#bdbdbd',
  gray2: '#999999',
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
    MuiFormControl: {
      styleOverrides: {
        root: {
          height: '100%',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: '100%',
        },
      },
    },
  },
};

export const muiTheme = createTheme(muiThemeObject);
