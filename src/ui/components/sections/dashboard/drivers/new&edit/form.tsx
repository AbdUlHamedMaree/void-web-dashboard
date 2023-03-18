import React, { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import type { DefaultValues } from '@mrii/react-form-builder';
import { FormBuilder } from '@mrii/react-form-builder';
import { FormSubmitInput, TextInput } from '@mrii/react-form-builder';
import type { DriverModel } from '$logic/models/driver';
import type { SchemaOf } from 'yup';
import { object, string } from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import '$modules/yup-empty-to-null';
import { NewEditPage } from '$ui/components/dumb/new&edit-page';
import { SelectDeviceInput, SelectVehicleInput } from '$ui/components/dumb/fields';

type FormFields = Omit<DriverModel, 'id' | 'vehicle' | 'device'> & {
  vehicle?: string;
  device?: string;
};

const schema: SchemaOf<FormFields> = object({
  name: string().trim().required(),
  email: string().trim().email().required(),
  phoneNumber: string().trim().required(),
  vehicle: string().trim().optional().nullable().emptyToNull(),
  device: string().trim().optional().nullable().emptyToNull(),
});

const baseDefaultValues: DefaultValues<FormFields> = {
  name: '',
  email: '',
  phoneNumber: '',
  device: '',
  vehicle: '',
};

export type DashboardDriversNewEditFormProps = {
  mode?: 'new' | 'edit';
  onSubmit?: SubmitHandler<FormFields>;
  defaultValues?: DefaultValues<FormFields>;
};

export const DashboardDriversNewEditForm: React.FC<DashboardDriversNewEditFormProps> = ({
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
    <NewEditPage resourceTitle='Driver' itemDisplayName={defaultValues.name} mode={mode}>
      <FormBuilder<FormFields>
        validation={schema}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      >
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid md={6} xs={12} item>
            <TextInput name='name' fullWidth />
          </Grid>
          <Grid md={6} xs={12} item>
            <TextInput name='email' fullWidth />
          </Grid>
          <Grid md={6} xs={12} item>
            <TextInput name='phoneNumber' fullWidth />
          </Grid>
          <Grid md={6} xs={12} item>
            <SelectVehicleInput fullWidth />
          </Grid>
          <Grid md={6} xs={12} item>
            <SelectDeviceInput fullWidth />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <FormSubmitInput size='large' variant='contained'>
            {isNew ? 'Create Driver' : 'Save Changes'}
          </FormSubmitInput>
        </Box>
      </FormBuilder>
    </NewEditPage>
  );
};
