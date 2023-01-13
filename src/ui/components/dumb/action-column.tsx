import { CustomColumn } from '@mrii/react-table-builder';
import { DeleteOutlined, EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import { Button, Stack, Tooltip } from '@mui/material';

export type ActionsColumnProps = {};

export const ActionsColumn: React.FC<ActionsColumnProps> = () => {
  return (
    <CustomColumn
      source='_actions'
      renderCell={() => (
        <Stack direction='row' spacing={1}>
          <Tooltip title='Show'>
            <Button color='primary'>
              <VisibilityOutlined />
            </Button>
          </Tooltip>
          <Tooltip title='Edit'>
            <Button color='info'>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title='Show'>
            <Button color='primary'>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Stack>
      )}
    />
  );
};
