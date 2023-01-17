import type { Components, Theme } from '@mui/material';
import { MuiAutocomplete } from './autocomplete';
import { MuiBackdrop } from './backdrop';
import { MuiButton } from './button';
import { MuiCard, MuiCardContent, MuiCardHeader } from './card';
import { MuiCssBaseline } from './css-baseline';
import { MuiFilledInput, MuiInput, MuiInputBase, MuiOutlinedInput } from './input';
import { MuiPaper } from './paper';
import { MuiTableHead } from './table';
import { MuiTooltip } from './tooltip';
import { MuiTypography } from './typography';

export const components = (theme: Theme): Components => ({
  MuiAutocomplete: MuiAutocomplete(theme),
  MuiBackdrop: MuiBackdrop(theme),
  MuiButton: MuiButton(theme),
  MuiCard: MuiCard(theme),
  MuiCardHeader: MuiCardHeader(theme),
  MuiCardContent: MuiCardContent(theme),
  MuiCssBaseline: MuiCssBaseline(theme),

  MuiInputBase: MuiInputBase(theme),
  MuiInput: MuiInput(theme),
  MuiFilledInput: MuiFilledInput(theme),
  MuiOutlinedInput: MuiOutlinedInput(theme),
  MuiPaper: MuiPaper(theme),
  MuiTableHead: MuiTableHead(theme),
  MuiTooltip: MuiTooltip(theme),
  MuiTypography: MuiTypography(theme),
});
