import React, { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import type { DefaultValues } from '@mrii/react-form-builder';
import { DateInput } from '@mrii/react-form-builder';
import { FormBuilder } from '@mrii/react-form-builder';
import { SelectInput } from '@mrii/react-form-builder';
import { FormSubmitInput, TextInput } from '@mrii/react-form-builder';
import type { SchemaOf } from 'yup';
import { date } from 'yup';
import { object, string } from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import type { VehicleModel } from '$logic/models/vehicle';
import { carsBrands } from '$logic/models/cars-brands';
import '$modules/yup-empty-to-null';
import { NewEditPage } from '$ui/components/dumb/new&edit-page';
import { SelectDeviceInput, SelectDriverInput } from '$ui/components/dumb/fields';

type FormFields = Omit<
  VehicleModel,
  | 'id'
  | 'location'
  | 'rotation'
  | 'status'
  | 'manufacturingDate'
  | 'driver'
  | 'device'
  | '_mock'
> & {
  manufacturingDate: Date;
  driver?: string;
  device?: string;
};

const schema: SchemaOf<FormFields> = object({
  name: string().trim().required(),
  vin: string().trim().required(),
  plateNumber: string().trim().required(),
  brand: string().trim().required(),
  model: string().trim().required(),
  manufacturingDate: date().max(new Date()).required(),
  driver: string().trim().optional().nullable().emptyToNull(),
  device: string().trim().optional().nullable().emptyToNull(),
});

const baseDefaultValues: DefaultValues<FormFields> = {
  name: '',
  vin: '',
  plateNumber: '',
  brand: '',
  model: '',
  device: '',
  driver: '',
  manufacturingDate: null,
};

const carsBrandsItems = carsBrands.reduce((acc, el) => {
  acc[el] = el;
  return acc;
}, {} as Record<string, string>);

export type DashboardVehiclesNewEditFormProps = {
  mode?: 'new' | 'edit';
  onSubmit?: SubmitHandler<FormFields>;
  defaultValues?: DefaultValues<FormFields>;
};

export const DashboardVehiclesNewEditForm: React.FC<
  DashboardVehiclesNewEditFormProps
> = ({ mode = 'new', onSubmit, defaultValues: propsDefaultValues }) => {
  const isNew = useMemo(() => mode === 'new', [mode]);

  const defaultValues = useMemo(
    () => ({
      ...baseDefaultValues,
      ...propsDefaultValues,
    }),
    [propsDefaultValues]
  );

  return (
    <NewEditPage resourceTitle='vehicle' itemDisplayName={defaultValues.name} mode={mode}>
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
            <TextInput name='vin' fullWidth />
          </Grid>
          <Grid md={6} xs={12} item>
            <TextInput name='plateNumber' fullWidth />
          </Grid>
          <Grid md={6} xs={12} item>
            <SelectInput name='brand' fullWidth items={carsBrandsItems} />
          </Grid>
          <Grid md={6} xs={12} item>
            <TextInput name='model' fullWidth />
          </Grid>
          <Grid md={6} xs={12} item>
            <DateInput name='manufacturingDate' />
          </Grid>
          <Grid md={6} xs={12} item>
            <SelectDriverInput fullWidth />
          </Grid>
          <Grid md={6} xs={12} item>
            <SelectDeviceInput fullWidth />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <FormSubmitInput size='large' variant='contained'>
            {isNew ? 'Create Vehicle' : 'Save Changes'}
          </FormSubmitInput>
        </Box>
      </FormBuilder>
    </NewEditPage>
  );
};
