import { useOpenModal } from '@/hooks';
import s from '@/styles/addButton.module.css';
import { FC, ReactNode } from 'react';
import { Modal } from './';

type Props = {
  textBtn: string;
  children: (close: VoidFunction) => ReactNode;
  reset?: VoidFunction;
};

export const AddButton: FC<Props> = ({ textBtn, children, reset }) => {
  const [addOpen, openModal, closeModal] = useOpenModal();

  const onclose = () => {
    closeModal();
    reset?.();
  };

  return (
    <>
      <button className={s.addButton} onClick={openModal}>
        {textBtn}
      </button>

      <Modal open={addOpen} closeModal={onclose}>
        {children(onclose)}
      </Modal>
    </>
  );
};
