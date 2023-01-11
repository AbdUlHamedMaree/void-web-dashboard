import { MouseEventHandler, useState } from 'react';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import { MenuPopover } from '$ui/components/shared/menu-popover';
import { Link } from '$ui/components/shared/link';

const MENU_OPTIONS = [
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '#',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '#',
  },
];

export type DashboardLayoutAccountPopover = {};

export const DashboardLayoutAccountPopover: React.FC<
  DashboardLayoutAccountPopover
> = () => {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen: MouseEventHandler<HTMLButtonElement> = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open
            ? {
                '&:before': {
                  zIndex: 1,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: theme => alpha(theme.palette.grey[900], 0.8),
                },
              }
            : {}),
        }}
      >
        <Avatar src='/__mock/john-doe.png' alt='photoURL' />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant='subtitle2' noWrap>
            {'John Doe'}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
            {'Administrator'}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map(option => (
            <MenuItem
              key={option.label}
              href={option.linkTo}
              component={Link}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
};
