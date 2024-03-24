import styled from 'styled-components';
import { Text } from '@/commons/text';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Profile } from './components/Profile';

export function Header() {
  return (
    <StyledHeader>
      <LogoContainer>
        <Text type='h1'>Todo list</Text>
        <AssignmentTurnedInIcon />
      </LogoContainer>

      <Profile />
    </StyledHeader>
  );
}

const StyledHeader = styled('header')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const LogoContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`;
