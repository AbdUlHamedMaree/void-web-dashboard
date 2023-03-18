import type { ActionsColumnExtraProps } from '@mrii/react-table-builder';
import { ActionsColumn as BuilderActionsColumn } from '@mrii/react-table-builder';
import { DeleteOutlined, EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import type { GridRowParams, GridValidRowModel } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useCallback } from 'react';

export type AppActionsColumnClickHandler<R extends GridValidRowModel = any> = (
  params: GridRowParams<R>
) => () => unknown;

export type ActionsColumnProps = {
  disableShow?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;

  onShow?: AppActionsColumnClickHandler;
  onEdit?: AppActionsColumnClickHandler;
  onDelete?: AppActionsColumnClickHandler;

  extraActions?: ActionsColumnExtraProps['getActions'];
};

export const AppActionsColumn: React.FC<ActionsColumnProps> = ({
  disableShow,
  disableEdit,
  disableDelete,
  onShow,
  onEdit,
  onDelete,
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
            icon={<VisibilityOutlined />}
            onClick={onShow?.(params)}
          />
        ),
        !disableEdit && (
          <GridActionsCellItem
            key='edit'
            color='info'
            label='Edit'
            icon={<EditOutlined />}
            onClick={onEdit?.(params)}
          />
        ),
        !disableDelete && (
          <GridActionsCellItem
            key='delete'
            color='error'
            label='Delete'
            icon={<DeleteOutlined />}
            onClick={onDelete?.(params)}
          />
        ),
        ...(extraActions?.(params) ?? []),
      ].filter(el => !!el) as JSX.Element[],
    [disableDelete, disableEdit, disableShow, extraActions, onDelete, onEdit, onShow]
  );

  return (
    <BuilderActionsColumn
      field='actions'
      headerName=''
      align='right'
      flex={1}
      minWidth={126}
      getActions={getActions}
    />
  );
};
