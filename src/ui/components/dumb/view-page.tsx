import { Typography, Card } from '@mui/material';
import React from 'react';
import { DefaultContainer } from './default-container';

export type ViewPageProps = {
  title?: React.ReactNode;
};

export const ViewPage: React.FC<React.PropsWithChildren<ViewPageProps>> = ({
  title,
  children,
}) => {
  return (
    <DefaultContainer maxWidth='lg'>
      <Typography variant='h4'>{title}</Typography>
      <Card sx={{ mt: 3, p: 2 }}>{children}</Card>
    </DefaultContainer>
  );
};
