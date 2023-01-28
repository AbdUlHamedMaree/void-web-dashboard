import React, { forwardRef, memo } from 'react';
import { styled } from '@mui/material/styles';
import { Scrollbars } from 'react-custom-scrollbars-2';

const StyledScrollbars = styled(Scrollbars)``;

export type ScrollbarProps = React.ComponentProps<typeof StyledScrollbars>;

export const Scrollbar = memo(
  forwardRef<Scrollbars, React.PropsWithChildren<ScrollbarProps>>(function Scrollbar(
    { children, ...props },
    ref
  ) {
    return (
      <StyledScrollbars universal {...props} ref={ref}>
        {children}
      </StyledScrollbars>
    );
  })
);
