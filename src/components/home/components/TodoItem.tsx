import { Button } from '@/commons/button';
import { ListItem, CardContent, CardActions, Card } from '@mui/material';
import styled from 'styled-components';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Text } from '@/commons/text';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { formatDate } from '@/utils/helpers';
import { Todo } from '@/interfaces/todo';
import { priorityColors, statusColors } from '@/utils/const';
import { useMemo, useState } from 'react';
import { deleteTodo } from '@/services';
import { useTodosQuery } from '../providers/TodosQueryProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
  todo: Todo;
}

export function TodoItem({ todo }: Props) {
  const { push } = useRouter();
  const { refetch } = useTodosQuery();
  const { createdAt, description, priority, status, title, id } = todo || {};

  const parsedStatus = useMemo(() => status.replace('_', ' '), [status]);

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    toggleDeleting();
    await deleteTodo(id);
    toggleDeleting();
    refetch();
  };

  const toggleDeleting = () => setDeleting((prev) => !prev);

  return (
    <ListItem>
      <StyledCard>
        <CardContent>
          <CardHeader>
            <Text type='h2'>{title}</Text>

            <Text type='span' color={priorityColors[priority]}>
              {priority}
            </Text>
          </CardHeader>

          <Text color='text.secondary' mb={2}>
            {description}
          </Text>

          <DetailContainer>
            <Text type='span' fontWeight={700}>
              {formatDate(createdAt)}
            </Text>

            <Status type='span' fontWeight={700} bgColor={statusColors[status]}>
              {parsedStatus}
            </Status>
          </DetailContainer>
        </CardContent>

        <StyledCardActions>
          <Button endIcon={<EditRoundedIcon />} component={Link} href='/edit-todo'>
            Edit
          </Button>
          <Button endIcon={<DeleteRoundedIcon />} color='error' onClick={handleDelete}>
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </StyledCardActions>
      </StyledCard>
    </ListItem>
  );
}

const CardHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCard = styled(Card)`
  width: 100%;
`;

const StyledCardActions = styled(CardActions)`
  justify-content: flex-end;
`;

const DetailContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Status = styled(Text).withConfig({
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: 3px 8px;
  border-radius: 5px;
`;
