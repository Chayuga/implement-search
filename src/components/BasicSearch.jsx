import React from 'react';
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  InputBase,
  AppBar,
  Toolbar
} from '@mui/material';

import { styled, alpha } from '@mui/material/styles';
import { Search as SearchIcon } from '@mui/icons-material';

import { Users } from './users';

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

const BasicSearch = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Toolbar>
      </AppBar>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        {Users.map((user) => (
          <ListItemButton
            key={user.id}
            selected={selectedIndex === `{${user.id}}`}
            onClick={(event) => handleListItemClick(event, `{${user.id}}`)}
            sx={{
              color: '#000000',
              marginTop: '1rem',
              ':hover': { backgroundColor: '#000000', color: '#ffffff' }
            }}>
            <ListItemText className={{ color: '#000000' }} primary={user.first_name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default BasicSearch;
