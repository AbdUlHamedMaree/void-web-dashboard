import { routes } from '$routes';
import type { AppActionsColumnClickHandler } from '$ui/components/dumb/action-column';
import { AppActionsColumn } from '$ui/components/dumb/action-column';
import { TableBuilder, TextColumn } from '@mrii/react-table-builder';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export type GreenDrivingVehiclesEventsSectionProps = {
  children?: React.ReactNode;
};

export const GreenDrivingVehiclesEventsSection: React.FC<
  GreenDrivingVehiclesEventsSectionProps
> = () => {
  const { push } = useRouter();

  const showHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        push(
          routes.dashboard['vehicles-events']['green-driving']['[id]'].view({
            query: { id },
          })
        ),
    [push]
  );

  return (
    <TableBuilder
      rows={[]}
      disableRowSelectionOnClick
      disableVirtualization
      sx={{ height: 'calc(100vh - 260px)', minHeight: 400 }}
      initialState={{
        columns: {
          columnVisibilityModel: {
            id: false,
          },
        },
        pagination: {
          paginationModel: {
            pageSize: 25,
          },
        },
      }}
    >
      <TextColumn field='id' />
      <TextColumn field='name' />
      <TextColumn field='email' />
      <TextColumn field='role.name' />
      <TextColumn field='phoneNumber' />
      <AppActionsColumn onShow={showHandler} disableDelete disableEdit />
    </TableBuilder>
  );
};
