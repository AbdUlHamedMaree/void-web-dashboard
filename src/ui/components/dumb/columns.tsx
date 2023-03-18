import { routes } from '$routes';
import { TextColumn } from '@mrii/react-table-builder';
import { Link } from '$ui/components/shared/link';

export const DriverNameColumn: React.FC = () => (
  <TextColumn
    field='driver.name'
    renderCell={params => (
      <Link
        href={routes.dashboard.drivers['[id]'].view({
          query: { id: params.row.driver?.id },
        })}
      >
        {params.value}
      </Link>
    )}
  />
);

export const VehicleNameColumn: React.FC = () => (
  <TextColumn
    field='vehicle.name'
    renderCell={params => (
      <Link
        href={routes.dashboard.vehicles['[id]'].view({
          query: { id: params.row.vehicle?.id },
        })}
      >
        {params.value}
      </Link>
    )}
  />
);

export const DeviceNameColumn: React.FC = () => (
  <TextColumn
    field='device.name'
    renderCell={params => (
      <Link
        href={routes.dashboard.devices['[id]'].view({
          query: { id: params.row.device?.id },
        })}
      >
        {params.value}
      </Link>
    )}
  />
);
