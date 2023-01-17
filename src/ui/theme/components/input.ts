import type { ThemeComponent } from '$logic/types';
import { alpha } from '@mui/material';

// ----------------------------------------------------------------------

export const MuiInputBase: ThemeComponent<'MuiInputBase'> = theme => ({
  styleOverrides: {
    root: {
      '&.Mui-disabled': {
        '& svg': { color: theme.palette.text.disabled },
      },
    },
    input: {
      '&::placeholder': {
        opacity: 1,
        color: theme.palette.text.disabled,
      },
    },
  },
});

export const MuiInput: ThemeComponent<'MuiInput'> = theme => ({
  styleOverrides: {
    underline: {
      '&:before': {
        borderBottomColor: alpha(theme.palette.grey[500], 0.56),
      },
    },
  },
});

export const MuiFilledInput: ThemeComponent<'MuiFilledInput'> = theme => ({
  styleOverrides: {
    root: {
      backgroundColor: alpha(theme.palette.grey[500], 0.12),
      '&:hover': {
        backgroundColor: alpha(theme.palette.grey[500], 0.16),
      },
      '&.Mui-focused': {
        backgroundColor: theme.palette.action.focus,
      },
      '&.Mui-disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
    },
    underline: {
      '&:before': {
        borderBottomColor: alpha(theme.palette.grey[500], 0.56),
      },
    },
  },
});

export const MuiOutlinedInput: ThemeComponent<'MuiOutlinedInput'> = theme => ({
  styleOverrides: {
    root: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: alpha(theme.palette.grey[500], 0.32),
      },
      '&.Mui-disabled': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.action.disabledBackground,
        },
      },
    },
  },
});
