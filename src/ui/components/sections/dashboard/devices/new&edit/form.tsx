import React, { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import type { DefaultValues } from '@mrii/react-form-builder';
import { FormBuilder } from '@mrii/react-form-builder';
import { FormSubmitInput, TextInput } from '@mrii/react-form-builder';
import type { SchemaOf } from 'yup';
import { object, string } from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import type { DeviceModel } from '$logic/models/device';
import '$modules/yup-empty-to-null';
import { NewEditPage } from '$ui/components/dumb/new&edit-page';
import { SelectDriverInput, SelectVehicleInput } from '$ui/components/dumb/fields';

type FormFields = Omit<DeviceModel, 'id' | 'driver' | 'vehicle'> & {
  driver?: string;
  vehicle?: string;
};

const schema: SchemaOf<FormFields> = object({
  imei: string().trim().required(),
  name: string().trim().required(),
  model: string().trim().required(),
  driver: string().trim().optional().nullable().emptyToNull(),
  vehicle: string().trim().optional().nullable().emptyToNull(),
});

const baseDefaultValues: DefaultValues<FormFields> = {
  imei: '',
  name: '',
  model: '',
  driver: '',
  vehicle: '',
};

export type DashboardDevicesNewEditFormProps = {
  mode?: 'new' | 'edit';
  onSubmit?: SubmitHandler<FormFields>;
  defaultValues?: DefaultValues<FormFields>;
};

export const DashboardDevicesNewEditForm: React.FC<DashboardDevicesNewEditFormProps> = ({
  mode = 'new',
  onSubmit,
  defaultValues: propsDefaultValues,
}) => {
  const isNew = useMemo(() => mode === 'new', [mode]);

  const defaultValues = useMemo(
    () => ({
      ...baseDefaultValues,
      ...propsDefaultValues,
    }),
    [propsDefaultValues]
  );

  return (
    <NewEditPage resourceTitle='Device' itemDisplayName={defaultValues.name} mode={mode}>
      <FormBuilder<FormFields>
        validation={schema}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      >
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid md={6} xs={12} item>
            <TextInput name='imei' fullWidth />
          </Grid>
          <Grid md={6} xs={12} item>
            <TextInput name='name' fullWidth />
          </Grid>
          <Grid md={6} xs={12} item>
            <TextInput name='model' fullWidth />
          </Grid>
          <Grid md={6} xs={12} item>
            <SelectDriverInput fullWidth />
          </Grid>
          <Grid md={6} xs={12} item>
            <SelectVehicleInput fullWidth />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <FormSubmitInput size='large' variant='contained'>
            {isNew ? 'Create Device' : 'Save Changes'}
          </FormSubmitInput>
        </Box>
      </FormBuilder>
    </NewEditPage>
  );
};
