import { createTheme, ThemeOptions } from '@mui/material';

import { MuiButtonOverrides } from './overrides/MuiButtonOverrides';

export const muiThemeObject: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: MuiButtonOverrides,
    },
  },
};

export const muiTheme = createTheme(muiThemeObject);
