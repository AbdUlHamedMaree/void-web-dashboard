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
import { mockData } from '$logic/helpers/mock-data';
import { mockUser } from '$logic/models/user';
import '$modules/yup-empty-to-null';
import { wait } from '$logic/utils/wait';
import { toast } from 'react-toastify';
import { useCurrentUserStore } from '$logic/state/current-user';
import { useCurrentRulesStore } from '$logic/state/current-rules';
import { AppAbilityBuilder } from '$logic/libs/casl';

const emails = ['super.admin@void.com', 'admin@void.com', 'manager@void.com'];

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

  const setUser = useCurrentUserStore(useCallback(s => s.setUser, []));
  const setRules = useCurrentRulesStore(useCallback(s => s.setRules, []));

  const schema = useMemo(
    () =>
      object({
        email: string().email().trim().required(),
        password: string().min(8).required(),
      }),
    []
  );

  const onSubmit = useCallback(
    async ({ email, password }: FieldsType) => {
      // mock
      await wait(600);

      if (!emails.includes(email) || password !== '12345678') {
        toast.error('Username or password are wrong');
        return;
      }

      mockData();

      const user = mockUser({
        email,
      });

      setUser(user);

      const { can, build } = new AppAbilityBuilder();
      can('manage', 'all');

      setRules(build().rules);

      push('/dashboard/live');
    },
    [push, setRules, setUser]
  );

  const form = useFormBuilder({
    defaultValues,
    validation: schema,
    onSubmit,
    onError: console.error,
  });

  return (
    <FormBuilderProvider {...form}>
      <Stack spacing={3}>
        <TextInput name='email' label='Email' />
        <PasswordInput name='password' label='Password' />
        <FormSubmitInput size='large' variant='contained' fullWidth>
          Login
        </FormSubmitInput>
      </Stack>
    </FormBuilderProvider>
  );
};
