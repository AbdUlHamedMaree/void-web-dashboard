import type { Theme } from '@mui/material/styles';
import type { Options } from '@mui/material';
import type { NextComponentType } from 'next';
import type { AuthGuardProps } from '$ui/components/guards/auth';
import type { AppCaslRule } from '$logic/libs/casl';
import type { UserModel } from '$logic/models/user';

declare module '@mui/material/useMediaQuery' {
  export default function useMediaQuery<TTheme = Theme>(
    queryInput: string | ((theme: TTheme) => string),
    options?: Options
  ): boolean;
}

declare module 'next' {
  export type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    layout?: React.ComponentType;
    auth?: AuthGuardProps;
  };
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    query?: Record<string, string | number | boolean | undefined | null>;
  }
}

declare module 'next-auth' {
  interface Session {
    user: UserModel;
    accessToken: string;
    rules: AppCaslRule[];
  }
  interface User {
    user: UserModel;
    accessToken: string;
    rules: AppCaslRule[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: UserModel;
    accessToken: string;
    rules: AppCaslRule[];
  }
}
