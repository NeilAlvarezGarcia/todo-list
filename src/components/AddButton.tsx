import { useOpenModal } from '@/hooks';
import s from '@/styles/addButton.module.css';
import { FC, ReactNode } from 'react';
import { Modal } from './';

type Props = {
  textBtn: string;
  children: (close: VoidFunction) => ReactNode;
};

export const AddButton: FC<Props> = ({ textBtn, children }) => {
  const [addOpen, openModal, closeModal] = useOpenModal();

  return (
    <>
      <button className={s.addButton} onClick={openModal}>
        {textBtn}
      </button>

      <Modal open={addOpen} closeModal={closeModal}>
        {children(closeModal)}
      </Modal>
    </>
  );
};
