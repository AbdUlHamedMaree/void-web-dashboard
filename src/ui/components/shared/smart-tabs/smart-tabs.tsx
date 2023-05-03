import { Tabs } from '@mui/material';
import { useSmartTabsContext } from './smart-tabs-provider';
import type { TabsProps } from '@mui/material';
import { useCallback } from 'react';

export type SmartTabsProps = TabsProps;

export const SmartTabs: React.FC<SmartTabsProps> = ({ children, ...props }) => {
  const { activeTabKey, setActiveTabKey } = useSmartTabsContext();

  const handleChange = useCallback(
    (event: React.SyntheticEvent<Element, Event>, key: any) => {
      setActiveTabKey(key);
      props.onChange?.(event, key);
    },
    [props, setActiveTabKey]
  );

  return (
    <Tabs {...props} value={activeTabKey} onChange={handleChange}>
      {children}
    </Tabs>
  );
};
