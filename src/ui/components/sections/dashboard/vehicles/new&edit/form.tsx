import React, { useMemo } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import type { DefaultValues } from '@mrii/react-form-builder';
import { FormBuilder, FormSubmitInput, TextInput } from '@mrii/react-form-builder';
import type { SchemaOf } from 'yup';
import { object, string } from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import type { VehicleModel } from '$logic/models/vehicle';

type FormFields = Omit<VehicleModel, 'id'>;

const schema: SchemaOf<FormFields> = object({
  name: string().trim().required(),
  plateNumber: string().trim().required(),
  model: string().trim().required(),
});

const baseDefaultValues: DefaultValues<FormFields> = {
  name: '',
  plateNumber: '',
  model: '',
};

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
    <Container maxWidth='lg'>
      <Typography variant='h4'>
        {isNew ? 'New Vehicle' : `Edit Vehicle "${defaultValues?.name}"`}
      </Typography>
      <Paper elevation={2} sx={{ mt: 3, p: 2 }}>
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
              <TextInput name='plateNumber' fullWidth />
            </Grid>
            <Grid md={6} xs={12} item>
              <TextInput name='model' fullWidth />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <FormSubmitInput size='large' variant='contained'>
              {isNew ? 'Create Vehicle' : 'Save Changes'}
            </FormSubmitInput>
          </Box>
        </FormBuilder>
      </Paper>
    </Container>
  );
};
