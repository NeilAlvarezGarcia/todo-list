import s from '@/styles/buttons.module.css';
import { FC, PropsWithChildren, useState } from 'react';

type Props = PropsWithChildren & {
  textBtn: string;
};

export const AddButton: FC<Props> = ({ textBtn, children }) => {
  const [addOpen, setAddOpen] = useState(false);

  const openModal = () => setAddOpen(true);
  const closeModal = () => setAddOpen(false);

  return (
    <div>
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
    </div>
  );
};
