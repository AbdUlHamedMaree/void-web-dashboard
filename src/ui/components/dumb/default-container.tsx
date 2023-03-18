import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DefaultContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2, 1),
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(3, 2),
  },
}));
