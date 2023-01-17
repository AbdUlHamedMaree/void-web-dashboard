import React, { useMemo } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { Box, Button, Card, Container, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { NextLinkComposed } from '$ui/components/shared/link';
import { routes } from '$routes';
import { TableBuilder, TextColumn } from '@mrii/react-table-builder';
import { array, number } from '@scandinavia/mock';
import { ActionsColumn } from '$ui/components/dumb/action-column';
import { mockDevice } from '$logic/models/device';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const devices = useMemo(() => array(mockDevice, number(10, 40)), []);

  return (
    <Container maxWidth='lg'>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant='h4'>Devices List</Typography>
        <Button
          component={NextLinkComposed}
          variant='contained'
          to={routes.dashboard.devices.new()}
          startIcon={<Add />}
        >
          New
        </Button>
      </Box>
      <Card sx={{ mt: 4 }}>
        <TableBuilder
          rows={devices}
          sx={{ height: 'calc(100vh - 250px)', minHeight: 400 }}
          initialState={{
            columns: { columnVisibilityModel: { id: false } },
            pagination: { pageSize: 25 },
          }}
        >
          <TextColumn field='id' />
          <TextColumn field='imei' />
          <TextColumn field='name' />
          <TextColumn field='model' />
          <ActionsColumn />
        </TableBuilder>
      </Card>
    </Container>
  );
};

Page.layout = DashboardLayout;

export default Page;
