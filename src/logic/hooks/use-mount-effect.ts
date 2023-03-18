import type React from 'react';
import { useEffect } from 'react';

export const useMountEffect = (effect: React.EffectCallback) => useEffect(effect, []);
