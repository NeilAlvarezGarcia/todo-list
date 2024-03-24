import { Button as ButtonBase, ButtonProps } from '@mui/material';
import { PropsWithChildren } from 'react';

interface Props extends ButtonProps, PropsWithChildren {
  textButton?: string;
}

export function Button({ children, textButton, variant = 'contained', ...props }: Props) {
  return (
    <ButtonBase variant={variant} {...props}>
      {textButton || children}
    </ButtonBase>
  );
}
