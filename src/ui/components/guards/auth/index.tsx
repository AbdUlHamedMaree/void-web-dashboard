import React from 'react';
import type { UrlObject } from 'url';

export type AuthGuardProps = {
  unAuthRedirectUrl?: UrlObject | string;
  // role?: VirtualRoleNameUnion | VirtualRoleNameUnion[];

  onUnAuth?: () => void;
  children?: React.ReactNode;
};

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  // role,

  // onUnAuth,
}) => {
  // const passRoleCheck = useMemo(() => passRoleGuard(role), [role]);
  // const [passed, setPassed] = useState(false);
  // const logout = useResolvedLogout();

  // const handleUnAuth = useCallback(() => {
  //   onUnAuth?.();
  //   logout();
  // }, [logout, onUnAuth]);

  // const setUser = useAuth(s => s.setUser);

  // const { data, isLoading, isIdle } = useGetMeService.query(
  //   {},
  //   {
  //     onSuccess: ({ data: user }) => {
  //       setUser(user);
  //     },
  //     onError: () => {
  //       logout();
  //     },
  //     refetchOnReconnect: false,
  //     refetchOnMount: false,
  //     refetchOnWindowFocus: false,
  //     refetchInterval: false,
  //     refetchIntervalInBackground: false,
  //     //
  //     keepPreviousData: true,
  //     staleTime: 0,
  //     cacheTime: Infinity,
  //     optimisticResults: true,
  //     structuralSharing: true,
  //     retryOnMount: false,
  //     retry: false,
  //   }
  // );
  // const user = useMemo(() => data?.data, [data?.data]);

  // useEffect(() => {
  //   if (isLoading || isIdle) return;
  //   if (!isDefined(user) || !passRoleCheck(user.roles?.map(el => el.name)))
  //     return handleUnAuth();
  //   setPassed(true);
  // }, [handleUnAuth, isLoading, user, passRoleCheck, isIdle]);

  // TODO: splash screen
  // if (!passed) return <>loading...</>;
  if (false) return <>loading...</>;

  return <>{children}</>;
};

// const passRoleGuard =
//   (allowed?: VirtualRoleNameUnion | VirtualRoleNameUnion[]) =>
//   (roles?: VirtualRoleNameUnion[]) => {
//     if (isNil(allowed)) return true;
//     if (isNil(roles)) return false;
//     if (isStringFull(allowed)) return roles.includes(allowed);
//     if (isArrayFull(allowed)) return allowed.some(role => roles.includes(role));
//     return false;
//   };
