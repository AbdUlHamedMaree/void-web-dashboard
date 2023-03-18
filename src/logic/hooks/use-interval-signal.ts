import { useEffect, useState } from 'react';

export const useIntervalSignal = (ms = 700) => {
  const [signal, setSignal] = useState(0);

  useEffect(() => {
    const clearSignal = setInterval(() => setSignal(n => n + 1), ms);

    return () => {
      clearInterval(clearSignal);
    };
  }, [ms]);

  return signal;
};
