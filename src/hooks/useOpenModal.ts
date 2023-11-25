import { useState } from 'react';

export const useOpenModal = () => {
  const [addOpen, setAddOpen] = useState(false);

  const openModal = () => setAddOpen(true);
  const closeModal = () => setAddOpen(false);

  return {
    addOpen,
    openModal,
    closeModal,
  };
};
