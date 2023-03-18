import React, { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import type { DefaultValues } from '@mrii/react-form-builder';
import { FormBuilder } from '@mrii/react-form-builder';
import { FormSubmitInput, SelectInput, TextInput } from '@mrii/react-form-builder';
import type { AppRoleUnion, UserModel } from '$logic/models/user';
import { AppRoleToReadable } from '$logic/models/user';
import { AppRoleEnum } from '$logic/models/user';
import type { SchemaOf } from 'yup';
import { object, string } from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import '$modules/yup-empty-to-null';
import { NewEditPage } from '$ui/components/dumb/new&edit-page';

type FormFields = Omit<UserModel, 'id'>;

const schema: SchemaOf<FormFields> = object({
  name: string().trim().required(),
  email: string().trim().email().required(),
  role: string().oneOf(Object.values<AppRoleUnion>(AppRoleEnum)).required(),
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
    <NewEditPage resourceTitle='User' itemDisplayName={defaultValues.name} mode={mode}>
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
            <SelectInput name='role' items={AppRoleToReadable} fullWidth />
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
    </NewEditPage>
  );
};
