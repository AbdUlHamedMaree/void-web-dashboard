import memoize from 'fast-memoize';
import type React from 'react';
import { useMemo } from 'react';

export const useMemoizedCallback = <T extends (...args: any[]) => any>(
  fn: T,
  deps: React.DependencyList
) => useMemo(() => memoize(fn), deps);
