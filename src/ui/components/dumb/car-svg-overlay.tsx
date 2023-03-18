import dynamic from 'next/dynamic';
import type { SVGOverlayProps } from 'react-leaflet';
import { styled } from '@mui/material';
import { forwardRef, memo } from 'react';
// import type { SVGOverlay as LeafletSVGOverlay } from 'leaflet';

const ICON_SIZE = 24;

const SVGOverlay = dynamic(
  () => import('react-leaflet').then(({ SVGOverlay }) => ({ default: SVGOverlay })),
  { ssr: false }
);

const StyledSVGOverlay = styled(SVGOverlay)(() => ({
  transformOrigin: 'center !important',
  outline: 'none',

  width: `${ICON_SIZE}px !important`,
  height: `${ICON_SIZE}px !important`,

  left: `${-(ICON_SIZE / 2)}px !important`,
  top: `${-(ICON_SIZE / 2)}px !important`,
}));

const StyledPath = styled('path')(({ rotate }) => ({
  transformOrigin: 'center',
  rotate: typeof rotate === 'number' ? rotate + 'deg' : rotate,
}));

export type CarSVGOverlayProps = SVGOverlayProps & {
  color?: string;
  fill?: string;
  stroke?: string;
  rotate?: number;
};

export const CarSVGOverlay = memo(
  forwardRef<any, CarSVGOverlayProps>(
    ({ color = 'black', fill = color, stroke = color, rotate, ...props }, ref) => {
      return (
        <StyledSVGOverlay
          {...props}
          ref={ref}
          attributes={{
            viewBox: '0 0 24 24',
            ...props.attributes,
          }}
        >
          <StyledPath
            d='M 6 18 L 11 6 Q 12 4 13 6 L 18 18 Q 19 20 17 19 L 13 16 Q 12 15 11 16 L 7 19 Q 5 20 6 18 Z'
            // d='M 12 36 L 22 12 Q 24 8 26 12 L 36 36 Q 38 40 34 38 L 26 32 Q 24 30 22 32 L 14 38 Q 10 40 12 36 Z'
            fill={fill}
            stroke={stroke}
            fillOpacity='0.4'
            strokeWidth='2px'
            rotate={rotate}
          />
        </StyledSVGOverlay>
      );
    }
  )
);
