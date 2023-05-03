import React, { useMemo } from 'react';
import type { CardProps } from '@mui/material';
import { Typography } from '@mui/material';
import { DefaultContainer } from '$ui/components/dumb/default-container';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import '$modules/yup-empty-to-null';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Card } from '@mui/material';

export type NewEditPageProps = {
  resourceTitle?: React.ReactNode;
  itemDisplayName?: React.ReactNode;
  mode?: 'new' | 'edit';
  cardProps?: CardProps;
};

export const NewEditPage: React.FC<React.PropsWithChildren<NewEditPageProps>> = ({
  resourceTitle,
  itemDisplayName,
  mode = 'new',
  cardProps,
  children,
}) => {
  const isNew = useMemo(() => mode === 'new', [mode]);

  return (
    <DefaultContainer maxWidth='lg'>
      <Typography variant='h4'>
        {isNew ? `New ${resourceTitle}` : `Edit ${resourceTitle} "${itemDisplayName}"`}
      </Typography>
      <Card {...cardProps} sx={{ mt: 3, p: 2, ...cardProps?.sx }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {children}
        </LocalizationProvider>
      </Card>
    </DefaultContainer>
  );
};
