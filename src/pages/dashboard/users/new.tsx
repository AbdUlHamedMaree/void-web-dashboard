import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import {
  FormBuilder,
  FormSubmitInput,
  SelectInput,
  TextInput,
} from '@mrii/react-form-builder';
import type { AppRoleUnion } from '$logic/models/user';
import { AppRoleEnum } from '$logic/models/user';
import { object, string } from 'yup';
import type { InitialValues } from '$logic/types/initial-values';

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

const initialValues: InitialValues<FormFields> = {
  name: '',
  email: '',
  role: '',
  phoneNumber: '',
};

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const handleSubmit = useCallback((values: FormFields) => {
    console.log(values);
  }, []);

  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' fontWeight='medium'>
        New User
      </Typography>
      <Paper elevation={2} sx={{ mt: 3, p: 2 }}>
        <FormBuilder<InitialValues<FormFields>>
          validation={schema}
          onSubmit={handleSubmit}
          defaultValues={initialValues}
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
              Create
            </FormSubmitInput>
          </Box>
        </FormBuilder>
      </Paper>
    </Container>
  );
};

Page.layout = DashboardLayout;

export default Page;
