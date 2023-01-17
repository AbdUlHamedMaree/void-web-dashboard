import type { ActionsColumnExtraProps } from '@mrii/react-table-builder';
import { ActionsColumn as BuilderActionsColumn } from '@mrii/react-table-builder';
import { DeleteOutlined, EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useCallback } from 'react';

export type ActionsColumnProps = {
  disableShow?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;

  extraActions?: ActionsColumnExtraProps['getActions'];
};

export const ActionsColumn: React.FC<ActionsColumnProps> = ({
  disableShow,
  disableEdit,
  disableDelete,
  extraActions,
}) => {
  const getActions = useCallback<ActionsColumnExtraProps['getActions']>(
    params =>
      [
        !disableShow && (
          <GridActionsCellItem
            key='show'
            color='primary'
            label='Show'
            // LinkComponent={NextLinkComposed}
            icon={<VisibilityOutlined />}
          />
        ),
        !disableEdit && (
          <GridActionsCellItem
            key='edit'
            color='info'
            label='Edit'
            icon={<EditOutlined />}
          />
        ),
        !disableDelete && (
          <GridActionsCellItem
            key='delete'
            color='error'
            label='Delete'
            icon={<DeleteOutlined />}
          />
        ),
        ...(extraActions?.(params) ?? []),
      ].filter(el => !!el) as JSX.Element[],
    [disableDelete, disableEdit, disableShow, extraActions]
  );

  return (
    <BuilderActionsColumn
      field='actions'
      headerName=''
      align='right'
      flex={1}
      getActions={getActions}
    />
  );
};
