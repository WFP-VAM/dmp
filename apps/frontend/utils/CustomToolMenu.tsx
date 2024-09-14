import {
  FileDownload,
  FilterList,
  MoreVert,
  ViewColumn,
} from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
  useTheme,
} from '@mui/material';
import { GridPreferencePanelsValue, useGridApiContext } from '@mui/x-data-grid';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as XLSX from 'xlsx';

import { colors } from 'theme/muiTheme';

interface CustomToolMenuProps {
  withBorder?: boolean;
}

const CustomToolMenu = ({ withBorder = true }: CustomToolMenuProps) => {
  const apiRef = useGridApiContext();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<MenuProps['anchorEl']>(null);

  const handleOpenMenu: React.MouseEventHandler<HTMLButtonElement> = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenFilterMenu = () => {
    apiRef.current.showFilterPanel();
    handleCloseMenu();
  };

  const handleOpenColumnMenu = () => {
    apiRef.current.showPreferences(GridPreferencePanelsValue.columns);
    handleCloseMenu();
  };

  const handleDownloadCSV = () => {
    apiRef.current.exportDataAsCsv({ fileName: 'Report Data' });
    handleCloseMenu();
  };

  const handleDownloadExcel = () => {
    const csvString = apiRef.current.getDataAsCsv();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const workbook = XLSX.read(csvString, { type: 'string' });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    XLSX.writeFile(workbook, 'Report Data.xlsx');
    handleCloseMenu();
  };

  const borderStyles = withBorder
    ? { border: `1px solid ${colors.gray}`, borderRadius: '4px' }
    : {};

  return (
    <>
      <IconButton
        sx={{
          '@media print': {
            display: 'none',
          },
        }}
        onClick={handleOpenMenu}
        style={{
          ...borderStyles,
          padding: theme.spacing(0.5),
          marginRight: theme.spacing(2),
          color: 'black',
        }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleOpenFilterMenu}>
          <ListItemIcon>
            <FilterList fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage id="Open Filters"></FormattedMessage>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleOpenColumnMenu}>
          <ListItemIcon>
            <ViewColumn fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage id="Manage Columns"></FormattedMessage>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDownloadCSV}>
          <ListItemIcon>
            <FileDownload fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage id="Download CSV" />
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDownloadExcel}>
          <ListItemIcon>
            <FileDownload fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage id="Download Excel" />
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default CustomToolMenu;
