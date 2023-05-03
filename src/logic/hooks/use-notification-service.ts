import { useCallback, useEffect } from 'react';

export type UseNotificationOptions = {
  requestPermissionOnMount?: boolean;

  onUnSupport?: () => unknown | Promise<void>;
  onGranted?: () => unknown | Promise<void>;
  onDenied?: () => unknown | Promise<void>;
  onRequestPermission?: () => unknown | Promise<void>;
  onRequestPermissionResult?: (
    permission: NotificationPermission
  ) => unknown | Promise<void>;
};

export const useNotificationService = ({
  requestPermissionOnMount = true,

  onUnSupport,
  onGranted,
  onDenied,
  onRequestPermission,
  onRequestPermissionResult,
}: UseNotificationOptions = {}) => {
  const requestPermission = useCallback(() => Notification.requestPermission(), []);

  useEffect(() => {
    if (!('Notification' in window)) return void onUnSupport?.();

    if (Notification.permission === 'granted') return void onGranted?.();
    if (Notification.permission === 'denied') return void onDenied?.();

    if (!requestPermissionOnMount) return;

    onRequestPermission?.();
    requestPermission().then(onRequestPermissionResult);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return requestPermission;
};
