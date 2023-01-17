import React, { useMemo } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import type { DefaultValues } from '@mrii/react-form-builder';
import { FormBuilder, FormSubmitInput, TextInput } from '@mrii/react-form-builder';
import type { SchemaOf } from 'yup';
import { object, string } from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import type { DeviceModel } from '$logic/models/device';

type FormFields = Omit<DeviceModel, 'id'>;

const schema: SchemaOf<FormFields> = object({
  imei: string().trim().required(),
  name: string().trim().required(),
  model: string().trim().required(),
});

const baseDefaultValues: DefaultValues<FormFields> = {
  imei: '',
  name: '',
  model: '',
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
    <Container maxWidth='lg'>
      <Typography variant='h4'>
        {isNew ? 'New Device' : `Edit Device "${defaultValues?.name}"`}
      </Typography>
      <Paper elevation={2} sx={{ mt: 3, p: 2 }}>
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
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <FormSubmitInput size='large' variant='contained'>
              {isNew ? 'Create Device' : 'Save Changes'}
            </FormSubmitInput>
          </Box>
        </FormBuilder>
      </Paper>
    </Container>
  );
};
