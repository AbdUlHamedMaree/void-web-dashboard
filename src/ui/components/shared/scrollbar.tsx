import React, { forwardRef, memo } from 'react';
import { styled } from '@mui/material/styles';
import { Scrollbars } from 'react-custom-scrollbars-2';

const StyledScrollbars = styled(Scrollbars)``;

export type ScrollbarProps = {
  useFlex?: boolean;
} & React.ComponentProps<typeof StyledScrollbars>;

export const Scrollbar = memo(
  forwardRef<Scrollbars, React.PropsWithChildren<ScrollbarProps>>(function Scrollbar(
    { children, useFlex, ...props },
    ref
  ) {
    const style = useFlex ? { height: 'auto', flex: 1 } : {};
    return (
      <StyledScrollbars
        universal
        {...props}
        style={{ ...style, ...props.style }}
        ref={ref}
      >
        {children}
      </StyledScrollbars>
    );
  })
);
