import { fontSizes, fontWeights } from '@/styles';
import { Typography, TypographyProps } from '@mui/material';
import { ElementType, PropsWithChildren } from 'react';
import styled from 'styled-components';

export interface Props extends TypographyProps, PropsWithChildren {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  error?: boolean;
}

export function Text({
  type = 'p',
  children,
  fontSize: fontSizeBase,
  fontWeight: fontWeightBase,
  error,
  ...props
}: Props) {
  const fontSize = fontSizeBase || error ? 14 : fontSizes[type as string] || 18;
  const fontWeight = fontWeightBase || fontWeights[type as string] || 400;

  return (
    <StyledTypography
      component={type as ElementType<any>}
      fontSize={fontSize}
      fontWeight={fontWeight}
      error={error}
      {...props}>
      {children}
    </StyledTypography>
  );
}

const StyledTypography = styled(Typography).withConfig({
  shouldForwardProp: (prop) => prop !== 'error',
})<{ error?: boolean }>`
  color: ${({ theme, color, error }) => (error ? theme.lightRed : color || theme.black)};
`;
