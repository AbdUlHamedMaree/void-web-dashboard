import React, { forwardRef, memo, useCallback, useState } from 'react';
import type { positionValues } from 'react-custom-scrollbars-2';
import type { Scrollbars } from 'react-custom-scrollbars-2';
import type { ScrollbarProps } from './scrollbar';
import { Scrollbar } from './scrollbar';

export type ShadowScrollbarProps = ScrollbarProps;

export const ShadowScrollbar = memo(
  forwardRef<Scrollbars, ShadowScrollbarProps>(function ShadowScrollbar(
    { children, useFlex, ...props },
    ref
  ) {
    const [shadows, setShadows] = useState({ top: 0, bottom: 1 });

    const handleUpdate = useCallback(
      ({ scrollTop, scrollHeight, clientHeight }: positionValues) => {
        const top = (1 / 20) * Math.min(scrollTop, 20);
        const bottomScrollTop = scrollHeight - clientHeight;
        const bottom =
          (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
        setShadows({ top, bottom });
      },
      []
    );

    return (
      <div
        style={{
          position: 'relative',
          height: useFlex ? 'auto' : '100%',
          flexGrow: useFlex ? 1 : 'auto',
          width: '100%',
        }}
      >
        <Scrollbar ref={ref} {...props} onUpdate={handleUpdate}>
          {children}
        </Scrollbar>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            opacity: shadows.top,
            background:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            opacity: shadows.bottom,
            background:
              'linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
          }}
        />
      </div>
    );
  })
);
