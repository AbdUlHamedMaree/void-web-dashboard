import { object, string } from 'yup';
import { useCallback, useMemo } from 'react';
import { Stack } from '@mui/material';
import {
  FormBuilder,
  FormSubmitInput,
  PasswordInput,
  TextInput,
} from '@mrii/react-form-builder';
import { useRouter } from 'next/router';

type FieldsType = {
  email: string;
  password: string;
};

const defaultValues: FieldsType = {
  email: '',
  password: '',
};

export const AuthLoginFormSection: React.FC = () => {
  const { push } = useRouter();
  const schema = useMemo(
    () =>
      object({
        email: string().email().trim().required(),
        password: string().min(8).required(),
      }),
    []
  );

  const onSubmit = useCallback((values: FieldsType) => {
    console.log({ values });
    push('/dashboard');
  }, []);

  return (
    <FormBuilder<FieldsType>
      defaultValues={defaultValues}
      validation={schema}
      onSubmit={onSubmit}
      onError={errors => console.error(errors)}
    >
      <Stack spacing={3}>
        <TextInput name='email' label='Email' />
        <PasswordInput name='password' label='Password' />
        <FormSubmitInput size='large' variant='contained' fullWidth>
          Login
        </FormSubmitInput>
      </Stack>
    </FormBuilder>
  );
};
