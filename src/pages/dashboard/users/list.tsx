import React, { useMemo } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { Box, Button, Container, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { NextLinkComposed } from '$ui/components/shared/link';
import { routes } from '$routes';
import TableBuilder, { TextColumn } from '@mrii/react-table-builder';
import { mockUser } from '$logic/models/user';
import { array, number } from '@scandinavia/mock';
import { ActionsColumn } from '$ui/components/dumb/action-column';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const users = useMemo(() => array(mockUser, number(10, 40)), []);

  return (
    <Container maxWidth='lg'>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant='h4' fontWeight='medium'>
          Users List
        </Typography>
        <Button
          component={NextLinkComposed}
          variant='contained'
          to={routes.dashboard.users.new()}
          startIcon={<Add />}
        >
          New
        </Button>
      </Box>
      <TableBuilder
        rows={[]}
        sx={{ mt: 4, height: 'calc(100vh - 250px)', minHeight: 400 }}
        initialState={{
          columns: { columnVisibilityModel: { id: false } },
          pagination: { pageSize: 25 },
        }}
      >
        <TextColumn source='id' />
        <TextColumn source='name' />
        <TextColumn source='email' />
        <TextColumn source='role' />
        <TextColumn source='phoneNumber' />
        <ActionsColumn />
      </TableBuilder>
    </Container>
  );
};

Page.layout = DashboardLayout;

export default Page;
