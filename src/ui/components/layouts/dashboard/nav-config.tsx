import { PathnameUrlObject } from '$routes';
import { LiveTv, PeopleAltOutlined, Speed } from '@mui/icons-material';

export type NavConfigItem = {
  title: string;
  path: string | PathnameUrlObject;
  icon?: JSX.Element;
  info?: React.ReactNode;
  children?: {
    title: string;
    path: string | PathnameUrlObject;
  }[];
};

export const navConfig: NavConfigItem[] = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: <Speed />,
  },
  {
    title: 'Live Preview',
    path: '/dashboard/live',
    icon: <LiveTv />,
  },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: <PeopleAltOutlined />,
    children: [
      {
        title: 'List',
        path: '/list',
      },
      {
        title: 'Add',
        path: '/new',
      },
    ],
  },
];
