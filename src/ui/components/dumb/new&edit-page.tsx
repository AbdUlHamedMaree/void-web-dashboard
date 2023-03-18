import React, { useMemo } from 'react';
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
};

export const NewEditPage: React.FC<React.PropsWithChildren<NewEditPageProps>> = ({
  resourceTitle,
  itemDisplayName,
  mode = 'new',
  children,
}) => {
  const isNew = useMemo(() => mode === 'new', [mode]);

  return (
    <DefaultContainer maxWidth='lg'>
      <Typography variant='h4'>
        {isNew ? `New ${resourceTitle}` : `Edit ${resourceTitle} "${itemDisplayName}"`}
      </Typography>
      <Card sx={{ mt: 3, p: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {children}
        </LocalizationProvider>
      </Card>
    </DefaultContainer>
  );
};
