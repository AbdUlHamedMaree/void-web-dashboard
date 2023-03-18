import type React from 'react';
import { useEffect, useRef } from 'react';

export const useRerenderEffect = (
  effect: React.EffectCallback,
  deps?: React.DependencyList
) => {
  const mountedRef = useRef(false);

  return useEffect(() => {
    if (mountedRef.current) return effect();
    mountedRef.current = true;
  }, deps);
};
