import { Button } from '@/commons/button';
import { useUser } from '@/context';
import { theme } from '@/styles';
import { Avatar, Popover } from '@mui/material';
import { useMemo, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from '@/services';
import { useRouter } from 'next/router';
import { LOGIN } from '@/utils/const';

export function Profile() {
  const { push } = useRouter();
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const userInitialCharacter = useMemo(() => user?.email?.charAt(0).toUpperCase(), [user]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'log-out' : undefined;

  const logOut = async () => {
    try {
      await logoutUser();
      push(LOGIN);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Avatar
        component='button'
        sx={{ width: 50, height: 50, bgcolor: theme.lightBlue }}
        onClick={handleClick}>
        {userInitialCharacter}
      </Avatar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Button variant='text' endIcon={<LogoutIcon />} onClick={logOut}>
          Log out
        </Button>
      </Popover>
    </>
  );
}
