import { object, string } from 'yup';
import { useCallback, useMemo } from 'react';
import { Stack } from '@mui/material';
import {
  FormBuilderProvider,
  FormSubmitInput,
  PasswordInput,
  TextInput,
  useFormBuilder,
} from '@mrii/react-form-builder';
import { useRouter } from 'next/router';
import '$modules/yup-empty-to-null';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { mockData } from '$logic/helpers/mock-data';
import { useMousetrap } from '@mrii/react-mousetrap-hook';

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

  const onSubmit = useCallback(
    async (credentials: FieldsType) => {
      const result = await signIn('credentials', { redirect: false, ...credentials });

      if (!result?.ok) {
        toast.error('Username or password are wrong');
        console.error('Login error');
        console.error(result?.error);
        return;
      }

      mockData();

      push('/dashboard/live');
    },
    [push]
  );

  const form = useFormBuilder({
    defaultValues,
    validation: schema,
    onSubmit,
    onError: console.error,
  });

  const refs = useMousetrap(
    'enter',
    useCallback(() => {
      form.triggerFormSubmit();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSubmit])
  );

  return (
    <FormBuilderProvider {...form}>
      <Stack spacing={3}>
        <TextInput inputRef={refs.email} name='email' label='Email' />
        <PasswordInput inputRef={refs.password} name='password' label='Password' />
        <FormSubmitInput size='large' variant='contained' fullWidth>
          Login
        </FormSubmitInput>
      </Stack>
    </FormBuilderProvider>
  );
};
