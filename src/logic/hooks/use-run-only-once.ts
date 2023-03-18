import { useState } from 'react';

export const useRunOnlyOnce = <T>(effect: () => T) => useState(() => effect())[0];
