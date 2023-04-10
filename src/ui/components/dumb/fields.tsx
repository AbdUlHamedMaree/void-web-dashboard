import { useDevicesOptions } from '$logic/state/devices';
import { useDriversOptions } from '$logic/state/drivers';
import { useRolesOptions } from '$logic/state/roles';
import { useVehiclesOptions } from '$logic/state/vehicles';
import type { SelectInputProps } from '@mrii/react-form-builder';
import { SelectInput } from '@mrii/react-form-builder';

export type SelectDriverInputProps = Omit<SelectInputProps, 'name' | 'items' | 'ref'>;

export const SelectDriverInput: React.FC<SelectDriverInputProps> = props => {
  const options = useDriversOptions();

  return <SelectInput name='driver' fullWidth items={options} {...props} />;
};

export type SelectVehicleInputProps = Omit<SelectInputProps, 'name' | 'items' | 'ref'>;

export const SelectVehicleInput: React.FC<SelectVehicleInputProps> = props => {
  const options = useVehiclesOptions();

  return <SelectInput name='vehicle' fullWidth items={options} {...props} />;
};

export type SelectDeviceInputProps = Omit<SelectInputProps, 'name' | 'items' | 'ref'>;

export const SelectDeviceInput: React.FC<SelectDeviceInputProps> = props => {
  const options = useDevicesOptions();

  return <SelectInput name='device' fullWidth items={options} {...props} />;
};

export type SelectUserRoleInputProps = Omit<SelectInputProps, 'name' | 'items' | 'ref'>;

export const SelectUserRoleInput: React.FC<SelectUserRoleInputProps> = props => {
  const options = useRolesOptions();

  return <SelectInput name='role' fullWidth items={options} {...props} />;
};
