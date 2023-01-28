import React from 'react';
import { Box, Button, Card, Container, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { NextLinkComposed } from '$ui/components/shared/link';
import type { NextUrl } from '$routes';
import type { TableBuilderProps } from '@mrii/react-table-builder';
import { TableBuilder } from '@mrii/react-table-builder';

export type ListPageProps = {
  resourceTitle?: React.ReactNode;
  newButtonUrl: NextUrl;
} & TableBuilderProps;

export const ListPage: React.FC<React.PropsWithChildren<ListPageProps>> = ({
  resourceTitle,
  newButtonUrl,
  children,
  ...props
}) => {
  return (
    <Container maxWidth='lg'>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant='h4'>{resourceTitle} List</Typography>
        <Button
          component={NextLinkComposed}
          variant='contained'
          to={newButtonUrl}
          startIcon={<Add />}
        >
          New
        </Button>
      </Box>
      <Card sx={{ mt: 4 }}>
        <TableBuilder
          disableVirtualization
          {...props}
          sx={{ height: 'calc(100vh - 250px)', minHeight: 400, ...props.sx }}
          initialState={{
            ...props.initialState,
            columns: {
              ...props.initialState?.columns,
              columnVisibilityModel: {
                id: false,
                ...props.initialState?.columns?.columnVisibilityModel,
              },
            },
            pagination: { pageSize: 25, ...props.initialState?.pagination },
          }}
        >
          {children}
        </TableBuilder>
      </Card>
    </Container>
  );
};
