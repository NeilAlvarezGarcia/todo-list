import styled from 'styled-components';
import { Text } from '../text';
import { PropsWithChildren } from 'react';

export function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <ErrorTextContainer>
      <Text error>{children}</Text>
    </ErrorTextContainer>
  );
}

const ErrorTextContainer = styled('div')`
  text-align: center;
`;
