import { isNil } from '$modules/checks';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type StateSetter<T = unknown> = React.Dispatch<React.SetStateAction<T>>;

export type Tab = {
  key: string;
  index: number;
};

export type SmartTabsContextModel = {
  tabs: Tab[];
  setTabs: StateSetter<Tab[]>;
  addTab: (tab: Tab) => void;
  removeTab: (key: string) => void;

  activeTabKey: string;
  setActiveTabKey: StateSetter<string>;
};

export const SmartTabsContext = createContext<SmartTabsContextModel | null>(null);

export const useSmartTabsContext = () => {
  const context = useContext(SmartTabsContext);

  if (isNil(context)) throw new Error('using `SmartTabsContext` outside of its provider');

  return context;
};

export type SmartTabsProviderProps = {
  initialTabKey: string;
};

export const SmartTabsProvider: React.FC<
  React.PropsWithChildren<SmartTabsProviderProps>
> = ({ initialTabKey, children }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabKey, setActiveTabKey] = useState(initialTabKey);

  const addTab = useCallback<SmartTabsContextModel['addTab']>(
    tab => setTabs(tabs => (tabs.some(t => t.key === tab.key) ? tabs : [...tabs, tab])),
    []
  );
  const removeTab = useCallback<SmartTabsContextModel['removeTab']>(
    key => setTabs(tabs => tabs.filter(el => el.key !== key)),
    []
  );

  const context = useMemo<SmartTabsContextModel>(
    () => ({
      tabs,
      setTabs,
      addTab,
      removeTab,

      activeTabKey,
      setActiveTabKey,
    }),
    [activeTabKey, addTab, removeTab, tabs]
  );

  return (
    <SmartTabsContext.Provider value={context}>{children}</SmartTabsContext.Provider>
  );
};
