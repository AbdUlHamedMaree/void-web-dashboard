import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  BoxProps,
  ListItemButtonProps,
  SvgIconProps,
} from '@mui/material';

import { NavConfigItem } from '../layouts/dashboard/nav-config';
import { PathnameUrlObject } from '$routes';
import { getPathname } from '$logic/utils/get-pathname';
import { NextLinkComposed } from './link';
import joinUrls from 'url-join';
import { KeyboardArrowDown, SvgIconComponent } from '@mui/icons-material';

const RotateIcon = styled(
  ({
    icon: Icon,
    rotate: _,
    degree: __,
    ...props
  }: { icon: SvgIconComponent; rotate?: boolean; degree?: number } & Omit<
    SvgIconProps,
    'rotate' | 'icon' | 'degree'
  >) => <Icon {...props} />
)(({ theme, degree = -180, rotate = false }) => ({
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.easeOut,
  }),
  transform: `rotate(${rotate ? degree : 0}deg)`,
}));

const ListItemStyle = styled((props: ListItemButtonProps) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
})) as typeof ListItemButton;

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export type NavItemProps = {
  item: NavConfigItem;
  active: (path?: string | PathnameUrlObject) => boolean;
  partial: (path?: string | PathnameUrlObject) => boolean;
};

export const NavItem: React.FC<NavItemProps> = ({
  item: { title, path, icon, info, children },
  active,
  partial,
}) => {
  const theme = useTheme();

  const isActive = useMemo(() => active(path), [path, active]);
  const isPartial = useMemo(() => partial(path), [path, partial]);

  const [open, setOpen] = useState(isPartial);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const activeStyle = useMemo(
    () => ({
      color: 'primary.main',
      fontWeight: 'bold',
      bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    }),
    [theme.palette.action.selectedOpacity, theme.palette.primary.main]
  );

  const partialStyle = useMemo(
    () => ({
      color: 'primary.main',
      fontWeight: 'medium',
    }),
    []
  );

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={toggle}
          sx={{
            ...(isPartial && partialStyle),
          }}
        >
          <ListItemIconStyle>{icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info}
          <RotateIcon icon={KeyboardArrowDown} rotate={open} sx={{ mr: 1 }} />
        </ListItemStyle>

        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {children.map(item => {
              const itemPath = joinUrls(getPathname(path), getPathname(item.path));
              const isActiveSub = active(itemPath);

              return (
                <ListItemStyle
                  key={title}
                  component={NextLinkComposed}
                  to={itemPath}
                  sx={{
                    ...(isActiveSub && activeStyle),
                    pl: 2,
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component='span'
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: theme => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={item.title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={NextLinkComposed}
      to={path}
      sx={{
        ...(isActive && activeStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
};

export type NavSectionProps = {
  navConfig: NavConfigItem[];
} & BoxProps;

export const NavSection: React.FC<NavSectionProps> = ({ navConfig, ...other }) => {
  const { pathname } = useRouter();

  const match = useCallback(
    (path?: string | PathnameUrlObject) =>
      path ? pathname.endsWith(getPathname(path)) : false,
    [pathname]
  );

  const partial = useCallback(
    (path?: string | PathnameUrlObject) =>
      path ? pathname.startsWith(getPathname(path)) : false,
    [pathname]
  );

  const items = useMemo(
    () =>
      navConfig.map(item => (
        <NavItem key={item.title} item={item} active={match} partial={partial} />
      )),
    [match, navConfig, partial]
  );

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {items}
      </List>
    </Box>
  );
};
