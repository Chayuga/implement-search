import React from 'react';
import { Box, Divider, InputBase, AppBar, Toolbar, Button } from '@mui/material';

import { useDownloadExcel } from 'react-export-table-to-excel';

import { styled, alpha } from '@mui/material/styles';
import { Search as SearchIcon, FilterList } from '@mui/icons-material';
import MultiSearchTable from './MultiSearchTable';
import { useStateContext } from '../context/SearchProvider';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

const MultiSearch = () => {
  const { setQuery, tableRef } = useStateContext();

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Users table',
    sheet: 'Users'
  });

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Search>
          <Box>
            <Button
              onClick={() => {}}
              sx={{
                margin: '5px',
                color: 'white',
                border: '1px solid white',
                borderRadius: '5px'
              }}>
              Filter <FilterList />
            </Button>

            <Button
              onClick={onDownload}
              sx={{
                margin: '5px',
                color: 'white',
                border: '1px solid white',
                borderRadius: '5px'
              }}>
              Export excel
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Divider />
      <MultiSearchTable />
    </Box>
  );
};

export default MultiSearch;
