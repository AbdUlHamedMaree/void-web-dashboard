import { useSmartTabsContext } from './smart-tabs-provider';
import React, { useEffect, useMemo, useRef } from 'react';

export type SmartTabBodyProps = { value: string; index: number };

export const SmartTabBody: React.FC<React.PropsWithChildren<SmartTabBodyProps>> = ({
  value,
  index,
  children,
}) => {
  const { activeTabKey, addTab, removeTab } = useSmartTabsContext();

  const previousTabKeyRef = useRef(activeTabKey);

  const isCurrentTabActive = useMemo(() => activeTabKey === value, [activeTabKey, value]);

  useEffect(() => {
    previousTabKeyRef.current = activeTabKey;
  }, [activeTabKey]);

  useEffect(() => {
    addTab({ key: value, index });

    return () => {
      removeTab(value);
    };
  }, [addTab, index, removeTab, value]);

  if (!isCurrentTabActive) return null;

  return <>{children}</>;
};
