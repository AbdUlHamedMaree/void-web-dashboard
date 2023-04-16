import { useCurrentAbility } from '$logic/hooks/use-current-ability';
import type { AppCaslSubjects } from '$logic/libs/casl';
import type { PathnameUrlObject } from '$routes';
import {
  AirlineSeatReclineNormalOutlined,
  DirectionsCarOutlined,
  HistoryOutlined,
  LiveTv,
  MemoryOutlined,
  PeopleAltOutlined,
} from '@mui/icons-material';
import { useCallback, useMemo } from 'react';

export type NavConfigItem = {
  title: string;
  path: string | PathnameUrlObject;
  icon?: JSX.Element;
  info?: React.ReactNode;
  children?: NavConfigItemChild[];
};

export type NavConfigItemChild = {
  title: string;
  path: string | PathnameUrlObject;
};

// TODO: filter by user ability
export const useNavigationConfig = () => {
  const ability = useCurrentAbility();
  const getResourceConfig = useGetResourceConfig();

  return useMemo(
    () =>
      [
        // {
        //   title: 'dashboard',
        //   path: '/dashboard',
        //   icon: <Speed />,
        // },
        ability.can('read', 'LivePreview') && {
          title: 'Live Preview',
          path: '/dashboard/live',
          icon: <LiveTv />,
        },
        getResourceConfig(
          {
            title: 'Users',
            path: '/dashboard/users',
            icon: <PeopleAltOutlined />,
          },
          'User'
        ),
        getResourceConfig(
          {
            title: 'Drivers',
            path: '/dashboard/drivers',
            icon: <AirlineSeatReclineNormalOutlined />,
          },
          'Driver'
        ),
        getResourceConfig(
          {
            title: 'Vehicles',
            path: '/dashboard/vehicles',
            icon: <DirectionsCarOutlined />,
          },
          'Vehicle'
        ),
        getResourceConfig(
          {
            title: 'Devices',
            path: '/dashboard/devices',
            icon: <MemoryOutlined />,
          },
          'Device'
        ),
        ability.can('read', 'TripsHistory') && {
          title: 'Trips History',
          path: '/dashboard/trips-history',
          icon: <HistoryOutlined />,
        },
      ].filter(Boolean) as NavConfigItem[],
    [ability, getResourceConfig]
  );
};

export const useGetResourceConfig = () => {
  const ability = useCurrentAbility();

  return useCallback(
    (
      config: Omit<NavConfigItem, 'children'>,
      subject: AppCaslSubjects
    ): NavConfigItem | undefined => {
      if (ability.cannot('read', subject) && ability.cannot('create', subject))
        return undefined;

      return {
        ...config,
        children: [
          ability.can('read', subject) && {
            title: 'List',
            path: '/list',
          },

          ability.can('create', subject) && {
            title: 'Add',
            path: '/new',
          },
        ].filter(Boolean) as NavConfigItemChild[],
      };
    },
    [ability]
  );
};
