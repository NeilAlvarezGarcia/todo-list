import { useOpenModal } from '@/hooks';
import s from '@/styles/addButton.module.css';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  textBtn: string;
};

export const AddButton: FC<Props> = ({ textBtn, children }) => {
  const { addOpen, closeModal, openModal } = useOpenModal();

  return (
    <>
      <button className={s.addButton} onClick={openModal}>
        {textBtn}
      </button>

      <section className={`${s.modal} ${addOpen && s.active}`}>
        <div className={s.content}>
          <button className={s.closeButton} onClick={closeModal}>
            x
          </button>

          {children}
        </div>
      </section>
    </>
  );
};