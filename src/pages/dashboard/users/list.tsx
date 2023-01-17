import React, { useMemo } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { Box, Button, Card, Container, Typography } from '@mui/material';
import {
  Add,
  DeleteOutlined,
  EditOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { NextLinkComposed } from '$ui/components/shared/link';
import { routes } from '$routes';
import { TableBuilder, TextColumn } from '@mrii/react-table-builder';
import { mockUser } from '$logic/models/user';
import { array, number } from '@scandinavia/mock';
import { ActionsColumn } from '$ui/components/dumb/action-column';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const users = useMemo(() => array(mockUser, number(10, 40)), []);

  return (
    <Container maxWidth='lg'>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant='h4'>Users List</Typography>
        <Button
          component={NextLinkComposed}
          variant='contained'
          to={routes.dashboard.users.new()}
          startIcon={<Add />}
        >
          New
        </Button>
      </Box>
      <Card sx={{ mt: 4 }}>
        <DataGrid
          rows={users}
          columns={[
            {
              field: 'id',
              headerName: 'ID',
              width: 200,
            },
            {
              field: 'name',
              headerName: 'Name',
              width: 200,
            },
            {
              field: 'email',
              headerName: 'Email',
              width: 200,
            },
            {
              field: 'role',
              headerName: 'Role',
              width: 200,
            },
            {
              field: 'phoneNumber',
              headerName: 'Phone Number',
              width: 200,
            },
            {
              field: 'actions',
              type: 'actions',
              getActions: () => [
                <GridActionsCellItem
                  key='show'
                  color='primary'
                  label='Show'
                  // LinkComponent={NextLinkComposed}
                  icon={<VisibilityOutlined />}
                />,
                <GridActionsCellItem
                  key='edit'
                  color='info'
                  label='Edit'
                  icon={<EditOutlined />}
                />,
                <GridActionsCellItem
                  key='delete'
                  color='error'
                  label='Delete'
                  icon={<DeleteOutlined />}
                />,
              ],
            },
          ]}
        />
        <TableBuilder
          rows={users}
          sx={{ height: 'calc(100vh - 250px)', minHeight: 400 }}
          initialState={{
            columns: { columnVisibilityModel: { id: false } },
            pagination: { pageSize: 25 },
          }}
        >
          <TextColumn field='id' />
          <TextColumn field='name' />
          <TextColumn field='email' />
          <TextColumn field='role' />
          <TextColumn field='phoneNumber' />
          <ActionsColumn />
        </TableBuilder>
      </Card>
    </Container>
  );
};

Page.layout = DashboardLayout;

export default Page;
