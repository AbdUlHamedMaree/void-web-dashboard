import { useRef, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { MenuItem, Stack, IconButton } from '@mui/material';
import { MenuPopover } from '$ui/components/shared/menu-popover';

const LANGS = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'ar',
    label: 'عربي',
  },
];

export type LanguagePopoverProps = {};

export const DashboardLayoutLanguagePopover: React.FC<LanguagePopoverProps> = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: theme =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        EN
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map(option => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              onClick={() => handleClose()}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
};
