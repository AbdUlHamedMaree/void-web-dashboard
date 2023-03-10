import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  Input,
  Slide,
  Button,
  IconButton,
  InputAdornment,
  ClickAwayListener,
} from '@mui/material';
import { Search } from '@mui/icons-material';

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.shadows[8],
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export type DashboardLayoutSearchbarProps = {};

export const DashboardLayoutSearchbar: React.FC<DashboardLayoutSearchbarProps> = () => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(prev => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Search />
          </IconButton>
        )}

        <Slide direction='down' in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder='Search…'
              startAdornment={
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant='contained' onClick={handleClose}>
              Search
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
};
