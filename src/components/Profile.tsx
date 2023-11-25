import { Logout, User } from '@/commons/icons';
import { LOGIN, PROFILE } from '@/helpers/const';
import { useOpenModal } from '@/hooks';
import s from '@/styles/profile.module.css';
import Link from 'next/link';

export const Profile = () => {
  const { addOpen, closeModal, openModal } = useOpenModal();

  return (
    <>
      <div className={s.profile} onClick={openModal}>
        <p>user@gmail.com</p>
      </div>

      <section className={`${s.modal} ${addOpen && s.active}`} onClick={closeModal}>
        <div className={s.content}>
          <Link href={PROFILE} className={s.link}>
            <User />

            <span>Perfil</span>
          </Link>

          <hr />

          <Link href={LOGIN} className={s.link}>
            <Logout />

            <span>Salir</span>
          </Link>
        </div>
      </section>
    </>
  );
};
