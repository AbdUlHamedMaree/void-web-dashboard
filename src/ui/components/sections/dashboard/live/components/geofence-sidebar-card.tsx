import {
  GpsFixedOutlined,
  GpsNotFixedOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Card, CardContent, Typography, Stack, IconButton, Tooltip } from '@mui/material';
import { memo, useCallback } from 'react';

export type GeofenceSidebarCardProps = {
  id: string;
  name?: string;
  type?: string;

  focused?: boolean;
  selected?: boolean;
  hidden?: boolean;

  setFocus?: (id: string) => void;
  toggleHide?: (id: string) => void;
};

export const GeofenceSidebarCard = memo<GeofenceSidebarCardProps>(
  function GeofenceSidebarCard({
    id,
    name,
    type,
    focused,
    selected,
    hidden,
    setFocus,
    toggleHide,
  }) {
    const handleFocusClick = useCallback(() => setFocus?.(id), [setFocus, id]);

    const handleHideClick = useCallback(() => toggleHide?.(id), [toggleHide, id]);

    return (
      <Card
        id={id}
        variant='outlined'
        sx={{
          display: 'flex',
          border: t => (selected ? `2px solid ${t.palette.primary.main}` : undefined),
        }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography typography='h6'>{name}</Typography>

          <Typography>{type}</Typography>
        </CardContent>
        <Stack gap={1} justifyContent='center' sx={{ p: 1 }}>
          <Tooltip title={focused ? 'Release' : 'Locate'}>
            <IconButton color='primary' onClick={handleFocusClick}>
              {focused ? <GpsFixedOutlined /> : <GpsNotFixedOutlined />}
            </IconButton>
          </Tooltip>
          <Tooltip title={hidden ? 'Show' : 'Hide'}>
            <IconButton color='primary' onClick={handleHideClick}>
              {hidden ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Card>
    );
  }
);
