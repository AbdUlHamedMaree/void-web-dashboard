import React, { useMemo } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import type { DefaultValues } from '@mrii/react-form-builder';
import {
  FormBuilder,
  FormSubmitInput,
  SelectInput,
  TextInput,
} from '@mrii/react-form-builder';
import type { AppRoleUnion } from '$logic/models/user';
import { AppRoleEnum } from '$logic/models/user';
import { object, string } from 'yup';
import type { SubmitHandler } from 'react-hook-form';

type FormFields = {
  name: string;
  email: string;
  role: AppRoleUnion;
  phoneNumber: string;
};

const schema = object({
  name: string().trim().required(),
  email: string().trim().email().required(),
  role: string().trim().required().oneOf(Object.values(AppRoleEnum)),
  phoneNumber: string().trim().required(),
});

const baseDefaultValues: DefaultValues<FormFields> = {
  name: '',
  email: '',
  role: '',
  phoneNumber: '',
};

export type DashboardUsersNewEditFormProps = {
  mode?: 'new' | 'edit';
  onSubmit?: SubmitHandler<FormFields>;
  defaultValues?: DefaultValues<FormFields>;
};

export const DashboardUsersNewEditForm: React.FC<DashboardUsersNewEditFormProps> = ({
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
      <Typography variant='h4' fontWeight='medium'>
        {isNew ? 'New User' : `Edit User "${defaultValues?.name}"`}
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
              <TextInput name='email' fullWidth />
            </Grid>
            <Grid md={6} xs={12} item>
              <SelectInput
                name='role'
                items={{ [AppRoleEnum.ADMIN]: 'Admin', [AppRoleEnum.MANAGER]: 'Manager' }}
                fullWidth
              />
            </Grid>
            <Grid md={6} xs={12} item>
              <TextInput name='phoneNumber' fullWidth />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <FormSubmitInput size='large' variant='contained'>
              {isNew ? 'Create User' : 'Save Changes'}
            </FormSubmitInput>
          </Box>
        </FormBuilder>
      </Paper>
    </Container>
  );
};
