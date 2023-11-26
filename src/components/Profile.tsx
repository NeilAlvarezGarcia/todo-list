import { Logout, User } from '@/commons/icons';
import { useUser } from '@/context';
import { PROFILE } from '@/utils/const';
import { useOpenModal } from '@/hooks';
import { logoutUser } from '@/services';
import s from '@/styles/profile.module.css';
import Image from 'next/image';
import Link from 'next/link';

export const Profile = () => {
  const [profileOptionsOpen, openProfileOptions, closeProfileOptions] = useOpenModal();
  const { user } = useUser();

  const logOut = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={s.profile} onClick={openProfileOptions}>
        <p>{user?.email}</p>

        <Image src='/profile.png' alt='profile' width={50} height={50} className={s.image} />
      </div>

      <section
        className={`${s.modal} ${profileOptionsOpen && s.active}`}
        onClick={closeProfileOptions}>
        <div className={s.content}>
          <Link href={PROFILE} className={s.link}>
            <User />

            <span>Perfil</span>
          </Link>

          <hr />

          <p className={s.link} onClick={logOut}>
            <Logout />

            <span>Salir</span>
          </p>
        </div>
      </section>
    </>
  );
};
